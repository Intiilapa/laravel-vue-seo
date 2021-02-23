<?php


namespace App\Traits;


use Illuminate\Http\JsonResponse;

trait ApiResponder
{
    protected function successResponse($data = []): JsonResponse
    {
        return response()->json($data);
    }

    protected function errorResponse(string $errorMessage = 'Bad request', int $responseCode = 400): JsonResponse
    {
        return response()->json(['error' => $errorMessage], $responseCode);
    }

    protected function forbiddenResponse(): JsonResponse
    {
        return $this->errorResponse('Forbidden', 403);
    }
}
