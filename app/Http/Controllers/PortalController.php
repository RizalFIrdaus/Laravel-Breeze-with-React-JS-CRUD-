<?php

namespace App\Http\Controllers;

use App\Http\Resources\PortalCollection;
use App\Models\Portal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PortalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $news = new PortalCollection(Portal::paginate(8));
        return Inertia::render('Homepage', [
            'title' => 'PortalNews',
            'news' => $news,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $portal = new Portal();
        $portal->title = $request->title;
        $portal->description = $request->description;
        $portal->image = fake()->imageUrl(640, 480, 'animals', true, 'cats');
        $portal->category = $request->category;
        $portal->author = Auth::user()->email;
        $portal->save();
        return redirect()->back()->with('message', 'Data berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Portal  $portal
     * @return \Illuminate\Http\Response
     */
    public function show(Portal $portal)
    {
        $dashboardNews = $portal::where('author', Auth::user()->email)->get();
        return Inertia::render('Dashboard', [
            'dashboardNews' => $dashboardNews,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Portal  $portal
     * @return \Illuminate\Http\Response
     */
    public function edit(Portal $portal, Request $request)
    {
        return Inertia::render('Edit', [
            'portalNews' => $portal->find($request->id),
            'title' => 'Edit From'
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Portal  $portal
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Portal $portal)
    {
        $portal = Portal::find($request->id);
        $portal->title = $request->title;
        $portal->description = $request->description;
        $portal->image = fake()->imageUrl(640, 480, 'animals', true, 'cats');
        $portal->category = $request->category;
        $portal->author = Auth::user()->email;
        $portal->save();
        // Portal::find($request->id)->update([
        //     'title' => "request->title",
        //     'description' => "request->description",
        //     'image' => fake()->imageUrl(640, 480, 'animals', true, 'cats'),
        //     'category' => "request->category",
        //     'author' => Auth::user()->email,
        // ]);
        return to_route('dashboard')->with('message', 'Data berhasil di ubah');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Portal  $portal
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $portal = Portal::find($request->id);
        $portal->delete();
        return to_route('dashboard');
    }
}
