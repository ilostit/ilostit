<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'password'],function() {
	Route::post('/email', 'Auth\ForgotPasswordController@getResetToken');
	Route::post('/reset', 'Auth\ResetPasswordController@reset');
});





Route::group(['prefix'=> 'auth'],function(){
    Route::post('/register','Auth\RegisterController@register');
    Route::post("/login",'Auth\LoginController@login');
    Route::post('/login/{social}/callback','Auth\LoginController@handleProviderCallback')->where('social','twitter|facebook|linkedin|google|');
});

Route::middleware(['jwt_auth'])->group(function(){
   Route::get('/hello',function(){
       return "Cool dude";
   });
   Route::post('/ItemsLost', 'ItemsLostController@ItemsLost');
   Route::post('/ItemsFound', 'ItemsFoundController@ItemsFound');
   Route::post('/ImageLost', 'ImageLostController@ImageLost');
   Route::get('/GetCategory', 'GetCategoryController@GetCategory');
   Route::post('/images-delete', 'UploadImagesController@destroy');
   Route::post('/images-save', 'AttachmentController@store');


   Route::get('/upload','ImageUploadController@fileCreate');
   Route::post('/save','ImageUploadController@fileStore');
   Route::post('/delete','ImageUploadController@fileDestroy');


});

