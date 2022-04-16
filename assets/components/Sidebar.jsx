import React from 'react'

const Sidebar = () => {
    return (
        <div>

            <div class="side-navbar active-nav d-flex justify-content-between flex-wrap flex-column" id="sidebar">
                <ul class="nav flex-column text-white w-100">
                    <a href="#" class="nav-link h3 text-white my-2">
                        Side Nav
                    </a>
                    <li href="#" class="nav-link">
                        <span class="mx-2">Home</span>
                    </li>
                    <li href="#" class="nav-link">
                        <span class="mx-2">About</span>
                    </li>
                    <li href="#" class="nav-link">
                        <span class="mx-2">Contact</span>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default Sidebar