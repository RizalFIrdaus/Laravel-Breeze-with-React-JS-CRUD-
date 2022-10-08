<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Portal>
 */
class PortalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => fake()->title(),
            'description' => fake()->sentence(2),
            'image' => fake()->imageUrl(640, 480, 'animals', true, 'cats'),
            'category' => fake()->name(),
            'author' => fake()->email(),
        ];
    }
}
