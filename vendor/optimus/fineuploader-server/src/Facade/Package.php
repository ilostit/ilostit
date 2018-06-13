<?php

namespace Optimus\FineuploaderServer\Facade;

use Illuminate\Support\Facades\Facade;

/**
 * @see \Optimus\BatchRequest\BatchRequest
 */
class Package extends Facade
{
    /**
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'package';
    }
}
