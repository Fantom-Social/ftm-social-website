import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Explore from './social/explorer/explorer';
import URL from './social/constants/websiteURL';
import Profile from './social/profile/profile';
import DAO from './social/dao/dao';
import LockSelector from './social/lock/lockDashboard';
import Proposal from './social/dao/proposal';
import Main from './general/main/main';
const LinkRoutes = () => {
    return (
        <div>
            <BrowserRouter basename={process.env.PUBLIC_URL}>

                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/app/explorer" element={<Explore/>} />
                    <Route path="/app/profile/:address" element={<Profile/>} />
                    <Route path="/app/lock" element={<LockSelector />} />
                    <Route path="/app/dao" element={<DAO />} />
                    <Route path="/app/dao/proposals/:id" element={<Proposal />} />
                    <Route path="/app" element={<meta http-equiv="refresh" content={"0; URL=" + URL + "app/lock"} />}/>
                    <Route path="*" element={<meta http-equiv="refresh" content={"0; URL=" + URL} />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default LinkRoutes;