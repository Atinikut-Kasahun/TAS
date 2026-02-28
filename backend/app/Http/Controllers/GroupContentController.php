<?php

namespace App\Http\Controllers;

use App\Models\GlobalSetting;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class GroupContentController extends Controller
{
    /**
     * Get all global settings.
     */
    public function getSettings(): JsonResponse
    {
        return response()->json(GlobalSetting::all()->pluck('value', 'key'));
    }

    /**
     * Update a global setting.
     */
    public function updateSetting(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'key' => 'required|string',
            'value' => 'required',
        ]);

        $setting = GlobalSetting::updateOrCreate(
            ['key' => $validated['key']],
            ['value' => $validated['value']]
        );

        return response()->json(['message' => 'Setting updated successfully', 'setting' => $setting]);
    }

    /**
     * List all global events.
     */
    public function listEvents(): JsonResponse
    {
        return response()->json(Event::with('tenant')->orderBy('event_date', 'desc')->get());
    }

    /**
     * Create a new global event.
     */
    public function storeEvent(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'event_date' => 'required|date',
            'location' => 'nullable|string',
            'status' => 'required|in:upcoming,ongoing,past,cancelled',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('events', 'public');
            $validated['image_path'] = $path;
        }

        $event = Event::create($validated);

        return response()->json(['message' => 'Event created successfully', 'event' => $event]);
    }

    /**
     * Generic file upload for global settings (e.g. Culture Images).
     */
    public function uploadFile(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|max:5120', // Up to 5MB
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('global_assets', 'public');
            return response()->json(['message' => 'File uploaded successfully', 'path' => $path]);
        }

        return response()->json(['message' => 'No file provided'], 400);
    }
}
