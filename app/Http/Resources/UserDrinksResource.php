<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserDrinksResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'name' =>$this->drink->name,
            'description' => $this->drink->description,
            'caffeine' => $this->drink->caffeine,
            'drinked_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
