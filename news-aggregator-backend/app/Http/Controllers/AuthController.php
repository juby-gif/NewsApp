<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Carbon\Carbon;

class AuthController extends Controller
{
    /**
     * Authenticate user and generate token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        try {
            $credentials = $this->validateData($request->all(), [
                'email' => 'required|email',
                'password' => 'required',
            ], [
                'email.required' => 'The email field is required.',
                'email.email' => 'The email must be a valid email address.',
                'password.required' => 'The password field is required.',
            ]);

            $user = User::where('email', $credentials['email'])->first();

            if (!$user || !Auth::attempt($credentials)) {
                return response()->json(['message' => 'Invalid email or password'], 401);
            }

            $token = $this->generateToken();
            $expiration = Carbon::now()->addDays(7);
            $refreshToken = $this->generateToken();

            $user->update([
                'token' => $token,
                'token_expires_at' => $expiration,
                'refresh_token' => $refreshToken,
            ]);

            return response()->json([
                'user' => $user,
                'message' => 'Login Successful'
            ]);
        } catch (ValidationException $exception) {
            return response()->json(['message' => $exception->getMessage()], 401);
        } catch (\Exception $exception) {
            return response()->json(['message' => 'An error occurred'], 500);
        }
    }

    /**
     * Refresh the token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function refreshToken(Request $request)
    {
        $refreshToken = $request->input('refresh_token');

        $user = User::where('refresh_token', $refreshToken)->first();

        if (!$user) {
            return response()->json(['message' => 'Invalid refresh token'], 401);
        }

        if (!$this->isTokenValid($user)) {
            return response()->json(['message' => 'Token has expired'], 401);
        }

        $newToken = $this->generateToken();
        $newExpiration = Carbon::now()->addDays(7);

        $user->update([
            'token' => $newToken,
            'token_expires_at' => $newExpiration,
        ]);

        return response()->json([
            'user' => $user,
            'token' => $newToken,
            'token_expires_at' => $newExpiration,
        ]);
    }

    /**
     * Register a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validatedData = $this->validateData($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ], [
            'name.required' => 'The name field is required.',
            'email.required' => 'The email field is required.',
            'email.email' => 'The email must be a valid email address.',
            'email.unique' => 'The email has already been taken.',
            'password.required' => 'The password field is required.',
        ]);

        $token = $this->generateToken();
        $expiration = Carbon::now()->addDays(7);
        $refreshToken = $this->generateToken();

        $user = $this->createUser($validatedData, $token, $expiration, $refreshToken);

        return response()->json([
            'user' => $user,
            'message' => 'Registration Successful'
        ]);
    }

    /**
     * Logout user and revoke tokens.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        $user = $request->user();

        $user->update([
            'token' => null,
            'token_expires_at' => null,
            'refresh_token' => null,
        ]);

        return response()->json(['message' => 'Logged out']);
    }

    /**
     * Validate data.
     *
     * @param  array  $data
     * @param  array  $rules
     * @param  array  $messages
     * @return array
     * @throws \Illuminate\Validation\ValidationException
     */
    private function validateData(array $data, array $rules, array $messages)
    {
        return Validator::make($data, $rules, $messages)->validate();
    }

    /**
     * Generate a random token.
     *
     * @return string
     */
    private function generateToken()
    {
        return hash('sha256', Str::random(32));
    }

    /**
     * Create a new user.
     *
     * @param  array  $data
     * @param  string  $token
     * @param  Carbon  $expiration
     * @param  string  $refreshToken
     * @return \App\Models\User
     */
    private function createUser(array $data, string $token, Carbon $expiration, string $refreshToken)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'token' => $token,
            'token_expires_at' => $expiration,
            'refresh_token' => $refreshToken,
        ]);
    }

    /**
     * Check if the token is still valid.
     *
     * @param  \App\Models\User  $user
     * @return bool
     */
    private function isTokenValid(User $user)
    {
        return $user->token_expires_at && $user->token_expires_at->isFuture();
    }
}
