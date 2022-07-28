import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import UserGoalList from "./goal/UserGoalList";
import { GoalForm } from "./goal/GoalForm";
import { GoalEdit } from "./goal/GoalEditForm";
import {CommunityGoalList} from "./goal/CommunityGoalList";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <UserGoalList /> : <Navigate to="/login" />}
          />
          <Route path="communitygoals" element={<CommunityGoalList/>}/>
          <Route path="edit/:id" element={<GoalEdit/>}/>
          <Route path="create" element={<GoalForm/>}/>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
};