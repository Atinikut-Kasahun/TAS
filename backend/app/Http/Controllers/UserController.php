<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Models\Tenant;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of all users across the system.
     * Accessible by Global Admins.
     */
    public function index(Request $request)
    {
        // Require admin role for global viewing
        if (!$request->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized. Global Admin access required.'], 403);
        }

        $users = User::with(['tenant', 'roles'])->get();

        return response()->json([
            'users' => $users
        ]);
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(Request $request)
    {
        // Require admin role to create users globally
        if (!$request->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized. Global Admin access required.'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'tenant_id' => 'required|exists:tenants,id',
            'role_slug' => 'required|exists:roles,slug',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'tenant_id' => $validated['tenant_id'],
        ]);

        // Attach the requested role
        $role = Role::where('slug', $validated['role_slug'])->first();
        if ($role) {
            $user->roles()->attach($role->id);
        }

        // Return user with relationships
        $user->load(['tenant', 'roles']);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 201);
    }
}
