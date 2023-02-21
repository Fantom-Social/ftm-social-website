import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Explore from './components/explorer/explorer';
import Profile from './components/profile/profile';
import Lock from './components/lock/lock';
import DAO from './components/dao/dao';
import LockSelector from './components/lock/lockDashboard';
import Proposal from './components/dao/proposal';
const LinkRoutes = () => {
    return (
        <div>
            <BrowserRouter basename={process.env.PUBLIC_URL}>

                <Routes>
                    <Route path="/explorer" element={<Explore/>} />
                    <Route path="/profile/:address" element={<Profile/>} />
                    <Route path="/lock" element={<LockSelector />} />
                    <Route path="/dao" element={<DAO />} />
                    <Route path="/dao/proposals/:id" element={<Proposal />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default LinkRoutes;