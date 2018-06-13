<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ItemsFound extends Model
{
	protected $table = 'itemsfound';
        /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description', 'user_id'
    ];
}
