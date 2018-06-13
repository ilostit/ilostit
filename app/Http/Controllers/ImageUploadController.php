<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ImageUpload;

class ImageUploadController extends Controller
{
    public function fileCreate()
    {
        return view('imageupload');
    }
    public function fileStore(Request $request)
    {

        $image = $request->file('file');
        $imageName = "test";
        $image->move(public_path('uploads'),$imageName);
        
        $imageUpload = new ImageUpload();
        $imageUpload->filename = $imageName;
        $imageUpload->save();
        return response()->json(['success'=>$imageName]);
    }
    public function fileDestroy(Request $request)
    {
        $filename =  $request->get('filename');
        ImageUpload::where('filename',$filename)->delete();
        $path=public_path().'/uploads/'.$filename;
        if (file_exists($path)) {
            unlink($path);
        }
        return $filename;  
    }
}