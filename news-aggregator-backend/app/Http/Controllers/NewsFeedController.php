<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Preference;
use App\Http\Controllers\ArticleController;

class NewsFeedController extends Controller
{
    protected $articleController;

    public function __construct(ArticleController $articleController)
    {
        $this->articleController = $articleController;
    }

    /**
     * Show the news feed for the currently logged-in user.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function showNewsFeed(Request $request)
    {
        $user = $this->getCurrentUser($request);
        $preferences = $this->getUserPreferences($user);
        $articles = $this->articleController->fetchArticles($preferences);
        return response()->json(['articles' => $articles]);
    }

    /**
     * Get the user's preferences.
     *
     * @param User $user
     * @return Preference
     */
    private function getUserPreferences(User $user)
    {
        return Preference::where('user_id', $user->id)->first();
    }

    /**
     *Retrieve the currently logged-in user based on the token from the request header.
     *@param Request $request The incoming request object.
     *@return User|null The authenticated user or null if not found.
    */
    private function getCurrentUser(Request $request)
    {
        $token = $request->header('Authorization');
        $user = null;

        if ($token) {
        $user = User::where('token', $token)->first();
        }

        return $user;
    }
    /**
     * Update the user's preferences.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updatePreferences(Request $request)
    {
        $user = $this->getCurrentUser($request);
        $preferences = $this->getUserPreferences($user);

        $preferences->update($request->all());

        return response()->json(['message' => 'Preferences updated successfully']);
    }

    /**
     * Create preferences for the user.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createPreferences(Request $request)
    {
        $user = $this->getCurrentUser($request);

        $preferences = new Preference();
        $preferences->source = $request->input('sources');
        $preferences->category = $request->input('categories');
        $preferences->author = $request->input('authors');
        // Set other preference properties as needed
        $preferences->save();

        $user->preference_id = $preferences->id;
        $user->save();

        return response()->json(['message' => 'Preferences created successfully']);
    }


    /**
     * Delete the user's preferences.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function deletePreferences(Request $request)
    {
        $user = $this->getCurrentUser($request);
        $preferences = $this->getUserPreferences($user);

        if ($preferences) {
            $preferences->delete();
            return response()->json(['message' => 'Preferences deleted successfully']);
        }

        return response()->json(['message' => 'No preferences found']);
    }
}
