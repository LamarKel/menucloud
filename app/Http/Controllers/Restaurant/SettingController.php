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

        $request->validate([
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

        $restaurantData = [
            'name' => $request->name,
            'owner_name' => $request->owner_name,
            'phone' => $request->phone,
            'address' => $request->address,
            'city' => $request->city,
            'cuisine_type' => $request->cuisine_type,
            'description' => $request->description,
        ];

        $cloudinary = new \Cloudinary\Cloudinary([
            'cloud' => [
                'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                'api_key' => env('CLOUDINARY_API_KEY'),
                'api_secret' => env('CLOUDINARY_API_SECRET'),
            ],
        ]);

        if ($request->hasFile('logo')) {
            $result = $cloudinary->uploadApi()->upload(
                $request->file('logo')->getRealPath(),
                ['folder' => 'menucloud/logos']
            );
            $restaurantData['logo'] = $result['secure_url'];
        }

        if ($request->hasFile('banner')) {
            $result = $cloudinary->uploadApi()->upload(
                $request->file('banner')->getRealPath(),
                ['folder' => 'menucloud/banners']
            );
            $restaurantData['banner'] = $result['secure_url'];
        }

        $restaurant->update($restaurantData);

        $settingsData = [
            'primary_color' => $request->primary_color,
            'font_choice' => $request->font_choice,
            'show_calories' => $request->show_calories == '1',
            'show_allergens' => $request->show_allergens == '1',
            'show_promotions' => $request->show_promotions == '1',
            'social_instagram' => $request->social_instagram,
            'social_facebook' => $request->social_facebook,
            'social_whatsapp' => $request->social_whatsapp,
            'bg_color' => $request->bg_color,
            'text_color' => $request->text_color,
            'card_color' => $request->card_color,
            'nav_color' => $request->nav_color,
        ];

        $restaurant->settings()->updateOrCreate(
            ['restaurant_id' => $restaurant->id],
            $settingsData
        );

        return redirect()->back()->with('success', 'Configuración actualizada exitosamente.');
    }
}
