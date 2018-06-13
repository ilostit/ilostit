<?php

namespace App\Http\Controllers;
use App\Transformers\Json;
use App\GetCategory;
use Illuminate\Http\Request;

class GetCategoryController extends Controller
{

    public function GetCategory()
    {
    	$category = GetCategory::all();
        return response()->json($category);
    }
}
