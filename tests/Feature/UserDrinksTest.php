<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Drink;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserDrinksTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */

    /** @test */
    public function user_can_add_drink()
    {
        //given we have a user

        $user = User::factory()->create();
        $drink =  Drink::factory()->create();

        $this->assertEquals(0 , $user->drinks->count());
        $response = $this->actingAs($user)->post(route('user-drink.store'),['drink'=>$drink->id]);

        $response->assertStatus(200);

        $this->assertEquals(1, $user->fresh()->drinks->count());

    }

    /** @test */
    public function drink_has_to_be_valid()
    {
        //given we have a user

        $user = User::factory()->create();
        $drink =  Drink::factory()->create();
        $this->actingAs($user);
        $this->assertEquals(0, $user->drinks->count());
        $response = $this->postJson(route('user-drink.store'), ['drink' => 'invlide drink']);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['drink']);
    }

    /** @test */
    public function drink_is_require()
    {
        //given we have a user

        $user = User::factory()->create();
        $drink =  Drink::factory()->create();
        $this->actingAs($user);
        $this->assertEquals(0, $user->drinks->count());
        $response = $this->postJson(route('user-drink.store'), ['drink' => null]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['drink']);
    }


    /** @test */
    public function drink_list_can_be_deleted()
    {
        //given we have a user

        $user = User::factory()->create();
        $drink =  Drink::factory()->create();
        $this->actingAs($user);

        $user->drinks()->attach($drink);

        $this->assertEquals(1, $user->fresh()->drinks->count());
        $response = $this->deleteJson(route('user-drink.destroy'));

        $response->assertStatus(200);
        $this->assertEquals(0, $user->fresh()->drinks->count());
    }


}
