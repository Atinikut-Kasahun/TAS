<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\ApplicantAttachment;
use App\Models\JobPosting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

use App\Mail\ApplicationReceived;
use Illuminate\Support\Facades\Mail;

class JobApplicationController extends Controller
{
    /**
     * Submit a new job application.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'job_posting_id' => 'required|exists:job_postings,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'age' => 'nullable',
            'gender' => 'nullable|string',
            'professional_background' => 'nullable|string',
            'years_of_experience' => 'nullable',
            'phone' => 'nullable|string',
            'portfolio_link' => 'nullable|url',
            'photo' => 'nullable|image|max:5000',
            'resume' => 'required|file|mimes:pdf|max:10000',
            'attachments.*' => 'nullable|file|mimes:pdf,doc,docx,jpg,png,zip,txt|max:10000',
        ]);

        $job = JobPosting::findOrFail($request->job_posting_id);

        // Upload main resume
        $resumePath = $request->file('resume')->store('resumes', 'public');

        // Upload photo if present
        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('photos', 'public');
        }

        // Create Applicant
        $applicant = Applicant::create([
            'tenant_id' => $job->tenant_id,
            'job_posting_id' => $job->id,
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'age' => is_numeric($request->age) ? (int) $request->age : null,
            'gender' => $request->gender,
            'professional_background' => $request->professional_background,
            'years_of_experience' => is_numeric($request->years_of_experience) ? (int) $request->years_of_experience : null,
            'resume_path' => $resumePath,
            'photo_path' => $photoPath,
            'portfolio_link' => $request->portfolio_link,
            'status' => 'new',
            'source' => 'website',
        ]);

        // Upload and create additional attachments
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('attachments', 'public');
                ApplicantAttachment::create([
                    'applicant_id' => $applicant->id,
                    'file_path' => $path,
                    'file_type' => $file->getClientOriginalExtension(),
                    'label' => $file->getClientOriginalName(),
                ]);
            }
        }

        // Send Automated Professional Email
        try {
            Mail::to($applicant->email)->send(new ApplicationReceived($applicant, $job));
        } catch (\Exception $e) {
            \Log::error("Failed to send applicant email: " . $e->getMessage());
        }

        return response()->json([
            'message' => 'Application submitted successfully',
            'applicant' => $applicant->load('attachments'),
        ], 201);
    }
}
