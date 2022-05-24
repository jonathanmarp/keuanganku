<?php

namespace App\Models;

class ResponseData
{
    // Response
    public $code = 200;
    public $response = true;
    public $description = "";
    public $data = [];

    // Return data
    public function Get()
    {
        // Make return variable
        $temp = [
            "code" => $this->code,
            "response" => $this->response,
            "description" => $this->description
        ];

        // Set data
        $temp["data"] = $this->data;
        
        // Remove password
        unset($temp["data"]["password"]);

        return $temp;
    }
}
