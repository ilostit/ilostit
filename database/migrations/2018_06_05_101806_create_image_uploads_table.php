<?php


//create_image_uploads_table

 public function up()
    {
        Schema::create('image_uploads', function (Blueprint $table) {
            $table->increments('id');
            $table->text('filename');
            $table->timestamps();
        });
    }