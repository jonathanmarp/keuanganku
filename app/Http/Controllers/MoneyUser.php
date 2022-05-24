<?php

namespace App\Http\Controllers;

use App\Models\MoneyUsers;
use App\Models\ResponseData;
use App\Models\UserDB;

class MoneyUser extends Controller
{
    private $types = [
        "income", "expenditure"
    ];

    public function create($key, $type, $size)
    {
        // Setup
        $can_create = false;

        // Make response
        $response = new ResponseData();
        $response->description = "Keuangan telah ditambah";

        // Check type is exist
        for($i = 0; $i < count($this->types); $i++)
        {
            if($this->types[$i] == $type)
            {
                // Set can create into true
                $can_create = true;
            }
        }

        // Check if can create
        if(!$can_create)
        {
            $response->code = 400;
            $response->description = "Type yang ditunjuk tidak ada";
        }

        // Check size is number
        if(!floatval($size))
        {
            // Set response
            $response->code = 400;
            $response->description = "Size harus number";

             // Set can delete to false
             $can_create = false;
        }

        // check key is exist
        if(!UserDB::where("key", $key)->first())
        {
            // Set response
            $response->code = 400;
            $response->description = "Key tidak diketahui";

             // Set can create to true
             $can_create = false;
        }

        // Check can create
        if($can_create)
        {
            $tempTime = round(microtime(true) * 1000);

            // Add data
            MoneyUsers::create([
                "key"    => $key,
                "type"   => $type,
                "size"   => $size,
                "create" => $tempTime,
                "update" => $tempTime
            ]);
        }

        // return response
        return response()->json($response->Get(), $response->code);
    }

    public function delete($key, $id)
    {
        // Setup
        $can_delete = true;

        // Make response
        $response = new ResponseData();
        $response->description = "Keuangan telah dihapus";

        // Check id is number
        if(!intval($id))
        {
            // Set response
            $response->code = 400;
            $response->description = "id harus number";

             // Set can delete to false
             $can_delete = false;
        }

        // check key is exist
        if(!UserDB::where("key", $key)->first())
        {
            // Set response
            $response->code = 400;
            $response->description = "Key tidak diketahui";

             // Set can delete to false
             $can_delete = false;
        }

        // Find data
        $temp = MoneyUsers::find($id);

        // Check if data isn't exist
        if($temp == null)
        {
            // Set response
            $response->code = 400;
            $response->description = "Id tidak diketahui";

            // Set can delete to false
            $can_delete = false;
        }
        
        // Check if key on id it's same as key on variable
        if($can_delete)
        {
            if($temp["key"] != $key)
            {
                // Set response
                $response->code = 400;
                $response->description = "Key tidak sama dengan key di id nya";

                // Set can delete to false
                $can_delete = false;
            }
        }

        // Check if can delete now
        if($can_delete)
        {
            // Delete
            $temp->delete();
        }

        // return response
        return response()->json($response->Get(), $response->code);
    }

    public function update($key, $id, $size)
    {
        // Setup
        $can_update = true;

        // Make response
        $response = new ResponseData();
        $response->description = "Keuangan telah diperbaharui";

        // Check id is number
        if(!intval($id))
        {
            // Set response
            $response->code = 400;
            $response->description = "id harus number";

             // Set can delete to false
             $can_update = false;
        }

        // Check size is number
        if(!floatval($size))
        {
            // Set response
            $response->code = 400;
            $response->description = "Size harus number";

             // Set can delete to false
             $can_update = false;
        }

        // check key is exist
        if(!UserDB::where("key", $key)->first())
        {
            // Set response
            $response->code = 400;
            $response->description = "Key tidak diketahui";

             // Set can delete to false
             $can_update = false;
        }

        // Find data
        $temp = MoneyUsers::find($id);

        // Check if data isn't exist
        if($temp == null)
        {
            // Set response
            $response->code = 400;
            $response->description = "Id tidak diketahui";

            // Set can delete to false
            $can_update = false;
        }
        
        // Check if key on id it's same as key on variable
        if($can_update)
        {
            if($temp["key"] != $key)
            {
                // Set response
                $response->code = 400;
                $response->description = "Key tidak sama dengan key di id nya";

                // Set can delete to false
                $can_update = false;
            }
        }

        // Check if can delete now
        if($can_update)
        {
            // Delete
            $temp->update([
                "size" => $size
            ]);
        }

        // return response
        return response()->json($response->Get(), $response->code);
    }

    public function all($key)
    {
        // Setup
        $can_get = true;

        // Make response
        $response = new ResponseData();
        $response->response = false;

        // check key is exist
        if(!UserDB::where("key", $key)->first())
        {
            // Set response
            $response->code = 400;
            $response->description = "Key tidak diketahui";

             // Set can get to false
             $can_get = false;
        }

        // Check if can get
        if($can_get)
        {
            $temp = MoneyUsers::where("key", $key);
            $data = $temp->get();

            // Check if not null
            if($data != null)
            {
                // Remove key
                for($i = 0; $i < count($data); $i++)
                {
                    // Remove key "key"
                    unset($data[$i]["key"]);
                }

                // Set data
                $response->data = $data;
            }
        }

        // return response
        return response()->json($response->Get(), $response->code);
    }
}
