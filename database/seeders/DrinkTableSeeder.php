<?php

namespace Database\Seeders;

use App\Models\Drink;
use Illuminate\Database\Seeder;

class DrinkTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        collect($this->getData())
            ->each(function($drink){
                Drink::factory()->create($drink);
            });


    }

    public function getData()
    {
        return [
            [
                'name'=> 'Monster Ultra Sunrise',
                'description'=> 'A refreshing orange beverage that has 75mg of caffeine per serving. Every can has two servings.',
                'caffeine'=> 75,
            ],
            [
                'name' => 'Black Coffee',
                'description' => 'A refreshing orange beverage that has 75mg of caffeine per serving. Every can has two servings.',
                'caffeine' => 95,
            ],
            [
                'name' => 'Americano',
                'description' => 'Sometimes you need to water it down a bit... and in comes the americano with an average of 77mg. of caffeine per serving.',
                'caffeine' => 77,
            ],
            [
                'name' => 'Sugar free NOS',
                'description' => 'Another orange delight without the sugar. It has 130 mg. per serving and each can has two servings.',
                'caffeine' => 130,
            ],
            [
                'name' => '5 Hour Energy',
                'description' => 'And amazing shot of get up and go! Each 2 fl. oz. container has 200mg of caffeine to get you going.
Minimum Requirements',
                'caffeine' => 200,
            ],
        ];
    }

}
