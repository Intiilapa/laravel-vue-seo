<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use App\Traits\ApiResponder;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    use ApiResponder;

    public function index(): JsonResponse
    {
        return $this->successResponse(UserResource::collection(User::where('id', '<>', Auth::id())->orderBy('id', 'desc')->get()));
    }

    public function store(StoreRequest $request): JsonResponse
    {
        $data = $request->all();
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        return $this->successResponse(new UserResource($user));
    }

    public function show(User $user): JsonResponse
    {
        return $this->successResponse(new UserResource($user));
    }

    public function update(UpdateRequest $request, User $user): JsonResponse
    {
        if (Auth::id() != $user->id) {
            $user->fill($request->all())->save();

            return $this->successResponse(new UserResource($user));
        }

        return $this->forbiddenResponse();
    }

    public function destroy($id): JsonResponse
    {
        if (Auth::id() != $id) {
            User::destroy($id);

            return $this->successResponse();
        }

        return $this->forbiddenResponse();
    }
}
