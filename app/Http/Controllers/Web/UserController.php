<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        // use Vue component
        return view('users');
    }

    public function show(User $user)
    {
        // SEO friendly
        return view('user')->with('user', $user);
    }
}
