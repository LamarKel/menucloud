<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function edit(Request $request)
    {
        $restaurant = $request->user()->restaurant->load('settings');

        return Inertia::render('Panel/Settings', [
            'restaurant' => $restaurant,
            'settings' => $restaurant->settings,
        ]);
    }

    public function update(Request $request)
    {
        $restaurant = $request->user()->restaurant;

        $restaurantData = $request->validate([
            'name' => 'required|string|max:255',
            'owner_name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'cuisine_type' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'logo' => 'nullable|image|max:2048',
            'banner' => 'nullable|image|max:4096',
        ]);

        if ($request->hasFile('logo')) {
            $cloudinary = new \Cloudinary\Cloudinary([
                'cloud' => [
                    'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                    'api_key' => env('CLOUDINARY_API_KEY'),
                    'api_secret' => env('CLOUDINARY_API_SECRET'),
                ],
            ]);
            $result = $cloudinary->uploadApi()->upload(
                $request->file('logo')->getRealPath(),
                ['folder' => 'menucloud/logos']
            );
            $restaurantData['logo'] = $result['secure_url'];
        }

        if ($request->hasFile('banner')) {
            $cloudinary = new \Cloudinary\Cloudinary([
                'cloud' => [
                    'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                    'api_key' => env('CLOUDINARY_API_KEY'),
                    'api_secret' => env('CLOUDINARY_API_SECRET'),
                ],
            ]);
            $result = $cloudinary->uploadApi()->upload(
                $request->file('banner')->getRealPath(),
                ['folder' => 'menucloud/banners']
            );
            $restaurantData['banner'] = $result['secure_url'];
        }

        $restaurant->update($restaurantData);

        $settingsData = $request->validate([
            'primary_color' => 'nullable|string|max:7',
            'font_choice' => 'nullable|string|max:50',
            'show_calories' => 'boolean',
            'show_allergens' => 'boolean',
            'show_promotions' => 'boolean',
            'social_instagram' => 'nullable|string|max:255',
            'social_facebook' => 'nullable|string|max:255',
            'social_whatsapp' => 'nullable|string|max:20',
            'bg_color' => 'nullable|string|max:9',
            'text_color' => 'nullable|string|max:9',
            'card_color' => 'nullable|string|max:9',
            'nav_color' => 'nullable|string|max:9',
        ]);

        $restaurant->settings()->updateOrCreate(
            ['restaurant_id' => $restaurant->id],
            $settingsData
        );

        return redirect()->back()->with('success', 'Configuración actualizada exitosamente.');
    }
}
