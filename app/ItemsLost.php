<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ItemsLost extends Model
{

	protected $table = 'itemslost';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description', 'user_id'
    ];
}
