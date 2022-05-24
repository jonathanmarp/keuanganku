<?php

namespace App\Http\Controllers;

use App\Http\Middleware\TrustProxies;
use App\Models\ResponseData;
use App\Models\UserDB;
use Illuminate\Support\Str;

class Users extends Controller
{
    public function index()
    {
        // Make response
        $response = new ResponseData();
        $response->description = "Server Sudah Siap";

        // return response
        return response()->json($response->Get(), $response->code);
    }

    public function login($email, $username, $password)
    {
        // Setup for create
        $can_login = true;

        // Make response
        $response = new ResponseData();
        $response->response = false;

        // Find user
        $tempUser = UserDB::where("email", $email)->first();

        // Check if username is exist
        if($tempUser == null)
        {
            $response->code = 400;
            $response->response = true;
            $response->description = "Tidak bisa login karena email atau password salah";
            
            $can_login = false;
        }

        // Check if can login
        if($can_login)
        {
            // Check password email, username, password same
            if($tempUser["email"] == $email && $tempUser["username"] == $username 
               && password_verify($password, $tempUser["password"]))
            {
                $response->data = $tempUser;
            }
            else
            {
                $response->code = 400;
                $response->response = true;
                $response->description = "Tidak bisa login karena email atau password salah";
            }
        }

        // return response
        return response()->json($response->Get(), $response->code);
    }

    public function delete($id, $key, $email, $username, $password)
    {
        // Setup for create
        $can_login = true;

        // Make response
        $response = new ResponseData();
        $response->description = "User telah dihapus";

        // Find user
        $tempUser = UserDB::where("email", $email)->first();

        // Check if username is exist
        if($tempUser == null)
        {
            $response->code = 400;
            $response->response = true;
            $response->description = "Tidak bisa delete karena email, id, key, username atau password salah";
            
            $can_login = false;
        }

        // Check if can login
        if($can_login)
        {
            // Check password email, username, password same
            if($tempUser["email"] == $email && $tempUser["username"] == $username 
               && password_verify($password, $tempUser["password"]) &&
               $tempUser["key"] == $key && $tempUser["id"] == $id)
            {
                $tempUser->delete();
            }
            else
            {
                $response->code = 400;
                $response->response = true;
                $response->description = "Tidak bisa delete karena email, id, key, username atau password salah";
            }
        }

        // return response
        return response()->json($response->Get(), $response->code);
    }

    public function update($id, $key, $email, $username, $password, $newusername)
    {
        // Setup for create
        $can_login = true;

        // Make response
        $response = new ResponseData();
        $response->description = "Username telah diubah";

        // Find user
        $tempUser = UserDB::where("email", $email)->first();

        // Check if username is exist
        if($tempUser == null)
        {
            $response->code = 400;
            $response->response = true;
            $response->description = "Tidak bisa delete karena email, id, key, username atau password salah";
            
            $can_login = false;
        }

        // Check if can login
        if($can_login)
        {
            // Check password email, username, password same
            if($tempUser["email"] == $email && $tempUser["username"] == $username 
               && password_verify($password, $tempUser["password"]) &&
               $tempUser["key"] == $key && $tempUser["id"] == $id)
            {
                $tempUser->update([
                    "username" => $newusername
                ]);
            }
            else
            {
                $response->code = 400;
                $response->response = true;
                $response->description = "Tidak bisa delete karena email, id, key, username atau password salah";
            }
        }

        // return response
        return response()->json($response->Get(), $response->code);
    }

    public function create($email, $username, $password)
    {
        // Setup for create
        $can_create = true;

        // Make response
        $response = new ResponseData();
        $response->description = "User sudah dibuat";

        // Check if username and email is exist
        if(UserDB::where("email", $email)->first() || UserDB::where("username", $username)->first())
        {
            $response->code = 400;
            $response->description = "Tidak bisa buat user karena antara email dan username sudah ada";
            
            $can_create = false;
        }

        // Check if can create new user
        if($can_create)
        {
            UserDB::create([
                "email"    => $email,
                "username" => $username,
                "password" => password_hash($password, PASSWORD_DEFAULT),
                "key"      => Str::random(32),
                "create"   => round(microtime(true) * 1000)
            ]);
        }

        // return response
        return response()->json($response->Get(), $response->code);
    }
}
