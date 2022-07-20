USE [master]

IF db_id('GoalGetters') IS NULl
  CREATE DATABASE [GoalGetters]
GO

USE [GoalGetters]
GO


DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [IFeelYou];
DROP TABLE IF EXISTS [GoalUpdate];
DROP TABLE IF EXISTS [Goal];
DROP TABLE IF EXISTS [DifficultyLevel];
GO


CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [FirebaseUserId] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Goal] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserProfileId] int NOT NULL,
  [GoalToMeet] nvarchar(255) NOT NULL,
  [DifficultyLevelId] int NOT NULL,
  [DateCreated] datetime NOT NULL,
  [ExpectedCompletionDate] datetime NOT NULL,
  [WorstCaseSenario] nvarchar(255),
  [CompletionDate] datetime
)
GO

CREATE TABLE [GoalUpdate] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [GoalId] int NOT NULL,
  [Timestamp] datetime NOT NULL,
  [WhatHaveYouDone] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [DifficultyLevel] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [IFeelYou] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [GoalId] int NOT NULL,
  [UserProfileId] int NOT NULL
)
GO

ALTER TABLE [Goal] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [IFeelYou] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [GoalUpdate] ADD FOREIGN KEY ([GoalId]) REFERENCES [Goal] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [IFeelYou] ADD FOREIGN KEY ([GoalId]) REFERENCES [Goal] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Goal] ADD FOREIGN KEY ([DifficultyLevelId]) REFERENCES [DifficultyLevel] ([Id])
GO