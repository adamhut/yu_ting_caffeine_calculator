@props(['propName'])


<header class="text-gray-600 body-font border-b border-gray-100">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <div
            class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round"
                stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
                viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span class="ml-3 text-xl">Daily Coffeine Tracker</span>
        </div>
        <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <span class="mr-5 hover:text-gray-900"> Hi, {{auth()->user()->name }}</span>
            <form action="/logout" method="POST" class=" font-semibold text-blue-500 ml-6">
                @csrf
                <button type="sumbit ">Log Out</button>
            </form>
        </nav>

    </div>
</header>