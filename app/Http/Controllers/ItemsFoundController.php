<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ItemsfoundController extends Controller
{
        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $itemsfound = ItemsFound::all();
        return response()->json($itemsfound);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $itemsfound = new ItemsFound([
          'name' => $request->get('name'),
          'description' => $request->get('description')
        ]);
        $itemsfound->save();


        return response()->json('itemsfound Added Successfully.');
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $itemsfound = ItemsFound::find($id);
        return response()->json($itemsfound);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $itemsfound = Itemsfound::find($id);
        $itemsfound->name = $request->get('name');
        $itemsfound->description = $request->get('description');
        $itemsfound->save();


        return response()->json('itemsfound Updated Successfully.');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      $itemsfound = ItemsFound::find($id);
      $itemsfound->delete();


      return response()->json('itemsfound Deleted Successfully.');
    }
}
