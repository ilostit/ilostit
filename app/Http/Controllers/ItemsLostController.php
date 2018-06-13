<?php

namespace App\Http\Controllers;
use App\Transformers\Json;
use App\ItemsLost;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Mockery\Exception;
use Validator;
use Auth;

class ItemsLostController extends Controller
{
    protected $currentUserId;

    public function ItemsLost(Request $request)
    {

        if (Auth::check()) {
          // The user is logged in...
          echo Auth::user()->id;
        }

        $data = $request->all();
        $validator =  Validator::make($data,[
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);

        if($validator->fails()){
            return response()->json([
                "error" => 'validation_error',
                "message" => $validator->errors(),
            ], 422);
        }
        if (Auth::check()) {

            $currentUserId = Auth::user()->id;
            //it will store the current logged in user id in user_id field
            $data['user_id'] =  $currentUserId;

        } else {
            echo('user not logged');
        }

        try{
            ItemsLost::create($data);
            return response()->json(['status','ItemsLost successfully'],200);
        }

          catch(Exception $e){
            return response()->json([
                "error" => "could_not_register",
                "message" => "Unable to register user"
            ], 400);
        }

    }
}
