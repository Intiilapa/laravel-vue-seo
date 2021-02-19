@extends('layouts.app')

@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center mb-1">
            <div class="col-md-2">
                <strong>ID: </strong>{{$user->id}}<br>
                <strong>E-mail: </strong>{{$user->email}}<br>
                <strong>Role: </strong>{{$user->role}}<br>
                <strong>Created At: </strong>{{$user->created_at}}<br>
            </div>
        </div>
    </div>
@endsection
