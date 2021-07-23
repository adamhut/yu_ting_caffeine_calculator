<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::truncate();
        \App\Models\User::factory(1)->create([
            'email'=>'test@example.com',
            'password' =>bcrypt('secret'),
        ]);
        $this->call(DrinkTableSeeder::class);
    }
}
