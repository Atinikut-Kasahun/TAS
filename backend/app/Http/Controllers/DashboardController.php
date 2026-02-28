<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\JobPosting;
use App\Models\JobRequisition;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->hasRole('admin')) {
            return $this->adminDashboard();
        }

        if ($user->hasRole('ta_manager')) {
            return $this->taManagerDashboard($user->tenant_id);
        }

        return $this->hiringManagerDashboard($user);
    }

    private function adminDashboard(): JsonResponse
    {
        $stats = [
            'total_tenants' => \App\Models\Tenant::count(),
            'total_active_jobs' => \App\Models\JobPosting::where('status', 'active')->count(),
            'total_candidates' => \App\Models\Applicant::count(),
            'total_employees' => \App\Models\User::count(),
            'new_applications_today' => \App\Models\Applicant::whereDate('created_at', \Carbon\Carbon::today())->count(),
            'active_events' => \App\Models\Event::where('status', 'upcoming')
                ->orWhere('status', 'ongoing')
                ->count(),
            'tenants_breakdown' => \App\Models\Tenant::withCount([
                'jobPostings as active_jobs_count' => function ($query) {
                    $query->where('status', 'active');
                },
                'jobPostings',
                'jobRequisitions',
                'users'
            ])->get(),
            'recent_global_applicants' => \App\Models\Applicant::with('tenant', 'jobPosting')
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get(),
        ];

        return response()->json($stats);
    }

    private function taManagerDashboard($tenantId): JsonResponse
    {
        $stats = [
            'active_jobs' => JobPosting::where('tenant_id', $tenantId)->where('status', 'active')->count(),
            'pending_requisitions' => JobRequisition::where('tenant_id', $tenantId)->where('status', 'pending')->count(),
            'new_applicants' => Applicant::where('tenant_id', $tenantId)->where('status', 'new')->count(),
            'applicants_by_status' => Applicant::where('tenant_id', $tenantId)
                ->select('status', DB::raw('count(*) as count'))
                ->groupBy('status')
                ->get(),
            'recent_requisitions' => JobRequisition::where('tenant_id', $tenantId)
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get(),
        ];

        return response()->json($stats);
    }

    private function hiringManagerDashboard($user): JsonResponse
    {
        $stats = [
            'my_requisitions' => JobRequisition::where('requested_by', $user->id)
                ->orderBy('created_at', 'desc')
                ->get(),
            'requisitions_status_count' => JobRequisition::where('requested_by', $user->id)
                ->select('status', DB::raw('count(*) as count'))
                ->groupBy('status')
                ->get(),
        ];

        return response()->json($stats);
    }
}
