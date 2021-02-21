<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DataController extends Controller
{
    public function roles(): JsonResponse
    {
        return response()->json(User::roles());
    }
}
