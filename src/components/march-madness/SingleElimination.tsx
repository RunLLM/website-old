import loadable from '@loadable/component';
import React, { useState } from 'react';
import { useEffect } from 'react';

import * as TeamNames from './data/MTeams.json';

type SingleEliminationMatch = {
    id: number;
    name: string;
    nextMatchId: number | null;
    tournamentRoundText: string;
    startTime: string;
    state: 'DONE' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' | 'SCHEDULED';
    participants: Participant[];
    nextLooserMatchId: string | number | undefined;
};

type Participant = {
    id: string;
    resultText: string | null;
    isWinner: boolean;
    status: 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null;
    name: string;
    picture?: string | null;
};

// TODO: Set up mocks with all the teams involved, find pictures of each team's logo
export const demoMatches: SingleEliminationMatch[] = [
    {
        id: 19874,
        name: 'Final - Match',
        nextMatchId: null,
        nextLooserMatchId: undefined,
        tournamentRoundText: '6',
        startTime: '2023-04-03',
        state: 'SCHEDULED',
        participants: [
            {
                id: '354506c4-d07d-4785-9759-755941a6cccc',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
            {
                id: '347ea699-bcf6-4085-a6fa-31039ba6fe96',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
        ],
    },
    {
        id: 19875,
        name: 'Semi Final - Match 1',
        nextMatchId: 19874,
        nextLooserMatchId: undefined,
        tournamentRoundText: '5',
        startTime: '2023-04-01',
        state: 'SCHEDULED',
        participants: [
            {
                id: 'e7fe8889-13e8-46f7-8515-3c9d89c07ba1',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
            {
                id: 'b3733519-82d1-4a04-9708-d80e1739cd70',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
        ],
    },
    {
        id: 19906,
        name: 'Semi Final - Match 2',
        nextMatchId: 19874,
        nextLooserMatchId: undefined,
        tournamentRoundText: '5',
        startTime: '2023-04-01',
        state: 'SCHEDULED',
        participants: [
            {
                id: '0be9036e-4cb4-4d95-b45a-b8725b4a2b73',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
            {
                id: '354506c4-d07d-4785-9759-755941a6cccc',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
        ],
    },
    {
        id: 19876,
        name: 'Round 4 - Match 1',
        nextMatchId: 19875,
        nextLooserMatchId: undefined,
        tournamentRoundText: '4',
        startTime: '2023-03-25',
        state: 'SCHEDULED',
        participants: [
            {
                id: '059743f7-9501-471e-8f9e-2d1032eccc67',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
            {
                id: '795ab8ee-9d9a-4f1d-8786-2aa6a98477d3',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
        ],
    },
    {
        id: 19891,
        name: 'Round 4 - Match 2',
        nextMatchId: 19875,
        nextLooserMatchId: undefined,
        tournamentRoundText: '4',
        startTime: '2023-03-25',
        state: 'SCHEDULED',
        participants: [
            {
                id: 'e7fe8889-13e8-46f7-8515-3c9d89c07ba1',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
            {
                id: 'c266ef2c-eab7-4b14-b41a-03265b6dfd74',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
        ],
    },
    {
        id: 19907,
        name: 'Round 4 - Match 3',
        nextMatchId: 19906,
        nextLooserMatchId: undefined,
        tournamentRoundText: '4',
        startTime: '2023-03-25',
        state: 'SCHEDULED',
        participants: [
            {
                id: '0be9036e-4cb4-4d95-b45a-b8725b4a2b73',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
            {
                id: 'de637dbe-363b-40cd-bae9-5a5e97a61ccc',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
        ],
    },
    {
        id: 19922,
        name: 'Round 4 - Match 4',
        nextMatchId: 19906,
        nextLooserMatchId: undefined,
        tournamentRoundText: '4',
        startTime: '2023-03-25',
        state: 'SCHEDULED',
        participants: [
            {
                id: '4ce605b1-28c5-4359-a2b8-5aa232299f2e',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
            {
                id: '354506c4-d07d-4785-9759-755941a6cccc',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
        ],
    },
    {
        id: 19877,
        name: 'Round 3 - Match 1',
        nextMatchId: 19876,
        nextLooserMatchId: undefined,
        tournamentRoundText: '3',
        startTime: '2023-03-23',
        state: 'SCHEDULED',
        participants: [
            {
                id: 'acf45434-78a1-4907-bf19-92235d180e8b',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
            {
                id: 'c673a13e-bd08-411f-b77c-11b1afe702cd',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
        ],
    },
    {
        id: 19884,
        name: 'Round 3 - Match 2',
        nextMatchId: 19876,
        nextLooserMatchId: undefined,
        tournamentRoundText: '3',
        startTime: '2023-03-23',
        state: 'SCHEDULED',
        participants: [
            {
                id: '51c449a7-fb04-445a-b478-1ca95feeeafa',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
            {
                id: '059743f7-9501-471e-8f9e-2d1032eccc67',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
        ],
    },
    {
        id: 19892,
        name: 'Round 3 - Match 3',
        nextMatchId: 19891,
        nextLooserMatchId: undefined,
        tournamentRoundText: '3',
        startTime: '2023-03-23',
        state: 'SCHEDULED',
        participants: [
            {
                id: 'e7fe8889-13e8-46f7-8515-3c9d89c07ba1',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
            {
                id: '7eac0db4-2e53-4f42-a670-58847b1f5e4c',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
        ],
    },
    {
        id: 19899,
        name: 'Round 3 - Match 4',
        nextMatchId: 19891,
        nextLooserMatchId: undefined,
        tournamentRoundText: '3',
        startTime: '2023-03-23',
        state: 'SCHEDULED',
        participants: [
            {
                id: '9d13814a-81b9-43d1-b9f9-42da1fe22578',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
            {
                id: 'c266ef2c-eab7-4b14-b41a-03265b6dfd74',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
        ],
    },
    {
        id: 19908,
        name: 'Round 3 - Match 5',
        nextMatchId: 19907,
        nextLooserMatchId: undefined,
        tournamentRoundText: '3',
        startTime: '2023-03-23',
        state: 'SCHEDULED',
        participants: [
            {
                id: 'de637dbe-363b-40cd-bae9-5a5e97a61ccc',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
            {
                id: '02aae6b1-bd99-4469-9d5a-4a83019d7dbc',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
        ],
    },
    {
        id: 19915,
        name: 'Round 3 - Match 6',
        nextMatchId: 19907,
        nextLooserMatchId: undefined,
        tournamentRoundText: '3',
        startTime: '2023-03-23',
        state: 'SCHEDULED',
        participants: [
            {
                id: '0be9036e-4cb4-4d95-b45a-b8725b4a2b73',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
            {
                id: '390f872a-fe15-48a3-9283-4191ff4263e7',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
        ],
    },
    {
        id: 19923,
        name: 'Round 3 - Match 7',
        nextMatchId: 19922,
        nextLooserMatchId: undefined,
        tournamentRoundText: '3',
        startTime: '2023-03-23',
        state: 'SCHEDULED',
        participants: [
            {
                id: 'ad2a0a89-d3bb-49dd-b8fc-2ec100e33477',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
            {
                id: '4ce605b1-28c5-4359-a2b8-5aa232299f2e',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
        ],
    },
    {
        id: 19930,
        name: 'Round 3 - Match 8',
        nextMatchId: 19922,
        nextLooserMatchId: undefined,
        tournamentRoundText: '3',
        startTime: '2023-03-23',
        state: 'SCHEDULED',
        participants: [
            {
                id: '354506c4-d07d-4785-9759-755941a6cccc',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
            {
                id: '7fbd66f3-7eaa-4567-bc87-5a82f10417ad',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
        ],
    },
    {
        id: 19878,
        name: 'Round 2 - Match 1',
        nextMatchId: 19877,
        nextLooserMatchId: undefined,
        tournamentRoundText: '2',
        startTime: '2023-03-18',
        state: 'SCHEDULED',
        participants: [
            {
                id: '1104',
                resultText: null,
                isWinner: false,
                status: null,
                name: '01 - Alabama',
                picture: null,
            },
            {
                id: '1268',
                resultText: null,
                isWinner: true,
                status: null,
                name: '08 - Maryland',
                picture: null,
            },
        ],
    },
    {
        id: 19881,
        name: 'Round 2 - Match 2',
        nextMatchId: 19877,
        nextLooserMatchId: undefined,
        tournamentRoundText: '2',
        startTime: '2023-03-18',
        state: 'SCHEDULED',
        participants: [
            {
                id: '1361',
                resultText: null,
                isWinner: false,
                status: null,
                name: '05 - San Diego St.',
                picture: null,
            },
            {
                id: '1202',
                resultText: null,
                isWinner: true,
                status: null,
                name: '13 - Furman',
                picture: null,
            },
        ],
    },
    {
        id: 19885,
        name: 'Round 2 - Match 3',
        nextMatchId: 19884,
        nextLooserMatchId: undefined,
        tournamentRoundText: '2',
        startTime: '2023-03-18',
        state: 'SCHEDULED',
        participants: [
            {
                id: '059743f7-9501-471e-8f9e-2d1032eccc67',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
            {
                id: '1124',
                resultText: null,
                isWinner: false,
                status: null,
                name: '03 - Baylor',
                picture: null,
            },
        ],
    },
    {
        id: 19888,
        name: 'Round 2 - Match 4',
        nextMatchId: 19884,
        nextLooserMatchId: undefined,
        tournamentRoundText: '2',
        startTime: '2023-03-18',
        state: 'SCORE_DONE',
        participants: [
            {
                id: '1281',
                resultText: null,
                isWinner: true,
                status: null,
                name: '07 - Missouri',
                picture: null,
            },
            {
                id: '1343',
                resultText: null,
                isWinner: false,
                status: null,
                name: '15 - Princeton',
                picture: null,
            },
        ],
    },
    {
        id: 19893,
        name: 'Round 2 - Match 5',
        nextMatchId: 19892,
        nextLooserMatchId: undefined,
        tournamentRoundText: '2',
        startTime: '2023-03-18',
        state: 'SCHEDULED',
        participants: [
            {
                id: '43ddad56-5798-4364-bd5c-81ba2640e22a',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
            {
                id: 'e7fe8889-13e8-46f7-8515-3c9d89c07ba1',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
        ],
    },
    {
        id: 19896,
        name: 'Round 2 - Match 6',
        nextMatchId: 19892,
        nextLooserMatchId: undefined,
        tournamentRoundText: '2',
        startTime: '2023-03-18',
        state: 'SCHEDULED',
        participants: [
            {
                id: '1181',
                resultText: null,
                isWinner: false,
                status: null,
                name: '05 - Duke',
                picture: null,
            },
            {
                id: '1397',
                resultText: null,
                isWinner: false,
                status: null,
                name: '04 - Tennessee',
                picture: null,
            },
        ],
    },
    {
        id: 19900,
        name: 'Round 2 - Match 7',
        nextMatchId: 19899,
        nextLooserMatchId: undefined,
        tournamentRoundText: '2',
        startTime: '2023-03-18',
        state: 'SCHEDULED',
        participants: [
            {
                id: '9d13814a-81b9-43d1-b9f9-42da1fe22578',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
            {
                id: '5b29528f-0dab-4dea-97d8-e6528b6cfc6c',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
        ],
    },
    {
        id: 19903,
        name: 'Round 2 - Match 8',
        nextMatchId: 19899,
        nextLooserMatchId: undefined,
        tournamentRoundText: '2',
        startTime: '2023-03-18',
        state: 'SCHEDULED',
        participants: [
            {
                id: '1277',
                resultText: null,
                isWinner: false,
                status: null,
                name: '07 - Michigan St.',
                picture: null,
            },
            {
                id: '1266',
                resultText: null,
                isWinner: false,
                status: null,
                name: '02 - Marquette',
                picture: null,
            },
        ],
    },
    {
        id: 19909,
        name: 'Round 2 - Match 9',
        nextMatchId: 19908,
        nextLooserMatchId: undefined,
        tournamentRoundText: '2',
        startTime: '2023-03-18',
        state: 'SCHEDULED',
        participants: [
            {
                id: '1222',
                resultText: null,
                isWinner: true,
                status: null,
                name: '01 - Houston',
                picture: null,
            },
            {
                id: '1120',
                resultText: null,
                isWinner: false,
                status: null,
                name: '09 - Auburn',
                picture: null,
            },
        ],
    },
    {
        id: 19912,
        name: 'Round 2 - Match 10',
        nextMatchId: 19908,
        nextLooserMatchId: undefined,
        tournamentRoundText: '2',
        startTime: '2023-03-18',
        state: 'SCHEDULED',
        participants: [
            {
                id: 'de637dbe-363b-40cd-bae9-5a5e97a61ccc',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
            {
                id: 'b4889d7a-5e25-4bae-aa4a-40776f44ef2d',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
        ],
    },
    {
        id: 19916,
        name: 'Round 2 - Match 11',
        nextMatchId: 19915,
        nextLooserMatchId: undefined,
        tournamentRoundText: '2',
        startTime: '2023-03-18',
        state: 'SCHEDULED',
        participants: [
            {
                id: '3a353047-4af3-4320-b2cf-2d83ddc9115a',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
            {
                id: '1462',
                resultText: null,
                isWinner: false,
                status: null,
                name: '03 - Xavier',
                picture: null,
            },
        ],
    },
    {
        id: 19919,
        name: 'Round 2 - Match 12',
        nextMatchId: 19915,
        nextLooserMatchId: undefined,
        tournamentRoundText: '2',
        startTime: '2023-03-18',
        state: 'SCHEDULED',
        participants: [
            {
                id: '1336',
                resultText: null,
                isWinner: false,
                status: null,
                name: '10 - Penn St.',
                picture: null,
            },
            {
                id: '1400',
                resultText: null,
                isWinner: false,
                status: null,
                name: '02 - Texas',
                picture: null,
            },
        ],
    },
    {
        id: 19924,
        name: 'Round 2 - Match 13',
        nextMatchId: 19923,
        nextLooserMatchId: undefined,
        tournamentRoundText: '2',
        startTime: '2023-03-18',
        state: 'SCHEDULED',
        participants: [
            {
                id: '1242',
                resultText: null,
                isWinner: false,
                status: null,
                name: '01 - Kansas',
                picture: null,
            },
            {
                id: '1116',
                resultText: null,
                isWinner: false,
                status: null,
                name: '08 - Arkansas',
                picture: null,
            },
        ],
    },
    {
        id: 19927,
        name: 'Round 2 - Match 14',
        nextMatchId: 19923,
        nextLooserMatchId: undefined,
        tournamentRoundText: '2',
        startTime: '2023-03-18',
        state: 'SCHEDULED',
        participants: [
            {
                id: '1388',
                resultText: null,
                isWinner: false,
                status: null,
                name: `05 - Saint Mary's`,
                picture: null,
            },
            {
                id: '613f708c-b000-4aa7-a9b1-47de355c9fac',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
        ],
    },
    {
        id: 19931,
        name: 'Round 2 - Match 15',
        nextMatchId: 19930,
        nextLooserMatchId: undefined,
        tournamentRoundText: '2',
        startTime: '2023-03-18',
        state: 'SCHEDULED',
        participants: [
            {
                id: 'b5edee08-6d0a-4e3d-9587-57a2d585e490',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
            {
                id: '7fbd66f3-7eaa-4567-bc87-5a82f10417ad',
                resultText: null,
                isWinner: false,
                status: null,
                name: '----',
                picture: null,
            },
        ],
    },
    {
        id: 19934,
        name: 'Round 2 - Match 16',
        nextMatchId: 19930,
        nextLooserMatchId: undefined,
        tournamentRoundText: '2',
        startTime: '2023-03-18',
        state: 'SCHEDULED',
        participants: [
            {
                id: '1321',
                resultText: null,
                isWinner: false,
                status: null,
                name: '07 - Northwestern',
                picture: null,
            },
            {
                id: '1417',
                resultText: null,
                isWinner: false,
                status: null,
                name: '02 - UCLA',
                picture: null,
            },
        ],
    },
    // START of South Division
    {
        id: 19879,
        name: 'Round 1 - Match 1',
        nextMatchId: 19878,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCORE_DONE',
        participants: [
            {
                id: '1104',
                resultText: null,
                isWinner: true,
                status: null,
                name: '01 - Alabama',
                picture: null,
            },
            {
                id: '1394',
                resultText: null,
                isWinner: false,
                status: null,
                name: '16 - Texas A&M-CC',
                picture: null,
            },
        ],
    },
    {
        id: 19880,
        name: 'Round 1 - Match 2',
        nextMatchId: 19878,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCORE_DONE',
        participants: [
            {
                id: '1268',
                resultText: null,
                isWinner: true,
                status: null,
                name: '08 - Maryland',
                picture: null,
            },
            {
                id: '1452',
                resultText: null,
                isWinner: false,
                status: null,
                name: '09 - West Virginia',
                picture: null,
            },
        ],
    },
    {
        id: 19882,
        name: 'Round 1 - Match 3',
        nextMatchId: 19881,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCORE_DONE',
        participants: [
            {
                id: '1361',
                resultText: null,
                isWinner: true,
                status: null,
                name: '05 - San Diego St.',
                picture: null,
            },
            {
                id: '1158',
                resultText: null,
                isWinner: false,
                status: null,
                name: '12 - College of Charleston',
                picture: null,
            },
        ],
    },
    {
        id: 19883,
        name: 'Round 1 - Match 4',
        nextMatchId: 19881,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCORE_DONE',
        participants: [
            {
                id: '1438',
                resultText: null,
                isWinner: false,
                status: null,
                name: '04 - Virginia',
                picture: null,
            },
            {
                id: '1202',
                resultText: null,
                isWinner: true,
                status: null,
                name: '13 - Furman',
                picture: null,
            },
        ],
    },
    {
        id: 19886,
        name: 'Round 1 - Match 5',
        nextMatchId: 19885,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCHEDULED',
        participants: [
            {
                id: '1166',
                resultText: null,
                isWinner: false,
                status: null,
                name: '06 - Creighton',
                picture: null,
            },
            {
                id: '1301',
                resultText: null,
                isWinner: false,
                status: null,
                name: '11 - NC State',
                picture: null,
            },
        ],
    },
    {
        id: 19887,
        name: 'Round 1 - Match 6',
        nextMatchId: 19885,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCORE_DONE',
        participants: [
            {
                id: '1124',
                resultText: null,
                isWinner: true,
                status: null,
                name: '03 - Baylor',
                picture: null,
            },
            {
                id: '1364',
                resultText: null,
                isWinner: false,
                status: null,
                name: '14 - UCSB',
                picture: null,
            },
        ],
    },
    {
        id: 19889,
        name: 'Round 1 - Match 7',
        nextMatchId: 19888,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCORE_DONE',
        participants: [
            {
                id: '1281',
                resultText: null,
                isWinner: true,
                status: null,
                name: '07 - Missouri',
                picture: null,
            },
            {
                id: '1429',
                resultText: null,
                isWinner: false,
                status: null,
                name: '10 - Utah St.',
                picture: null,
            },
        ],
    },
    {
        id: 19890,
        name: 'Round 1 - Match 8',
        nextMatchId: 19888,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCORE_DONE',
        participants: [
            {
                id: '1112',
                resultText: null,
                isWinner: false,
                status: null,
                name: '02 - Arizona',
                picture: null,
            },
            {
                id: '1343',
                resultText: null,
                isWinner: false,
                status: null,
                name: '15 - Princeton',
                picture: null,
            },
        ],
    },
    // END of south division
    // START of EAST division
    {
        id: 19894,
        name: 'Round 1 - Match 9',
        nextMatchId: 19893,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCHEDULED',
        participants: [
            {
                id: '1345',
                resultText: null,
                isWinner: false,
                status: null,
                name: '01 - Purdue',
                picture: null,
            },
            {
                id: '1192',
                resultText: null,
                isWinner: false,
                status: null,
                name: '16 - Fairleigh Dickinson',
                picture: null,
            },
        ],
    },
    {
        id: 19895,
        name: 'Round 1 - Match 10',
        nextMatchId: 19893,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCHEDULED',
        participants: [
            {
                id: '1272',
                resultText: null,
                isWinner: false,
                status: null,
                name: '08 - Memphis',
                picture: null,
            },
            {
                id: '1194',
                resultText: null,
                isWinner: false,
                status: null,
                name: '09 - FAU',
                picture: null,
            },
        ],
    },
    {
        id: 19897,
        name: 'Round 1 - Match 11',
        nextMatchId: 19896,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCORE_DONE',
        participants: [
            {
                id: '1181',
                resultText: null,
                isWinner: true,
                status: null,
                name: '05 - Duke',
                picture: null,
            },
            {
                id: '1331',
                resultText: null,
                isWinner: false,
                status: null,
                name: '12 - Oral Roberts',
                picture: null,
            },
        ],
    },
    {
        id: 19898,
        name: 'Round 1 - Match 12',
        nextMatchId: 19896,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCORE_DONE',
        participants: [
            {
                id: '1397',
                resultText: null,
                isWinner: true,
                status: null,
                name: '04 - Tennessee',
                picture: null,
            },
            {
                id: '1418',
                resultText: null,
                isWinner: false,
                status: null,
                name: '13 - Louisiana',
                picture: null,
            },
        ],
    },
    {
        id: 19901,
        name: 'Round 1 - Match 13',
        nextMatchId: 19900,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCHEDULED',
        participants: [
            {
                id: '1246',
                resultText: null,
                isWinner: false,
                status: null,
                name: '06 - Kentucky',
                picture: null,
            },
            {
                id: '1344',
                resultText: null,
                isWinner: false,
                status: null,
                name: '11 - Providence',
                picture: null,
            },
        ],
    },
    {
        id: 19902,
        name: 'Round 1 - Match 14',
        nextMatchId: 19900,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCHEDULED',
        participants: [
            {
                id: '1243',
                resultText: null,
                isWinner: false,
                status: null,
                name: '03 - Kansas St.',
                picture: null,
            },
            {
                id: '1286',
                resultText: null,
                isWinner: false,
                status: null,
                name: '14 - Montana St.',
                picture: null,
            },
        ],
    },
    {
        id: 19904,
        name: 'Round 1 - Match 15',
        nextMatchId: 19903,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCORE_DONE',
        participants: [
            {
                id: '1277',
                resultText: null,
                isWinner: true,
                status: null,
                name: '07 - Michigan St.',
                picture: null,
            },
            {
                id: '1425',
                resultText: null,
                isWinner: false,
                status: null,
                name: '10 - USC',
                picture: null,
            },
        ],
    },
    {
        id: 19905,
        name: 'Round 1 - Match 16',
        nextMatchId: 19903,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCORE_DONE',
        participants: [
            {
                id: '1266',
                resultText: null,
                isWinner: false,
                status: null,
                name: '02 - Marquette',
                picture: null,
            },
            {
                id: '1436',
                resultText: null,
                isWinner: false,
                status: null,
                name: '16 - Vermont',
                picture: null,
            },
        ],
    },
    // END East division
    // START Midwest Division
    {
        id: 19910,
        name: 'Round 1 - Match 17',
        nextMatchId: 19909,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCORE_DONE',
        participants: [
            {
                id: '1222',
                resultText: null,
                isWinner: true,
                status: null,
                name: '01 - Houston',
                picture: null,
            },
            {
                id: '1297',
                resultText: null,
                isWinner: false,
                status: null,
                name: '16 - N Kentucky',
                picture: null,
            },
        ],
    },
    {
        id: 19911,
        name: 'Round 1 - Match 18',
        nextMatchId: 19909,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCORE_DONE',
        participants: [
            {
                id: '1234',
                resultText: null,
                isWinner: false,
                status: null,
                name: '08 - Iowa',
                picture: null,
            },
            {
                id: '1120',
                resultText: null,
                isWinner: true,
                status: null,
                name: '09 - Auburn',
                picture: null,
            },
        ],
    },
    {
        id: 19913,
        name: 'Round 1 - Match 19',
        nextMatchId: 19912,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCHEDULED',
        participants: [
            {
                id: '1274',
                resultText: null,
                isWinner: false,
                status: null,
                name: '05 - Miami (FL)',
                picture: null,
            },
            {
                id: '1179',
                resultText: null,
                isWinner: false,
                status: null,
                name: '12 - Drake',
                picture: null,
            },
        ],
    },
    {
        id: 19914,
        name: 'Round 1 - Match 20',
        nextMatchId: 19912,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCHEDULED',
        participants: [
            {
                id: '1231',
                resultText: null,
                isWinner: false,
                status: null,
                name: '04 - Indiana',
                picture: null,
            },
            {
                id: '1245',
                resultText: null,
                isWinner: false,
                status: null,
                name: '13 - Kent St.',
                picture: null,
            },
        ],
    },
    {
        id: 19917,
        name: 'Round 1 - Match 21',
        nextMatchId: 19916,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCORE_DONE',
        participants: [
            {
                id: '1235',
                resultText: null,
                isWinner: false,
                status: null,
                name: '06 - Iowa St.',
                picture: null,
            },
            {
                id: '1338',
                resultText: null,
                isWinner: true,
                status: null,
                name: '11 - Pitt',
                picture: null,
            },
        ],
    },
    {
        id: 19918,
        name: 'Round 1 - Match 22',
        nextMatchId: 19916,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCORE_DONE',
        participants: [
            {
                id: '1462',
                resultText: null,
                isWinner: true,
                status: null,
                name: '03 - Xavier',
                picture: null,
            },
            {
                id: '1244',
                resultText: null,
                isWinner: false,
                status: null,
                name: '14 - Kennesaw St.',
                picture: null,
            },
        ],
    },
    {
        id: 19920,
        name: 'Round 1 - Match 23',
        nextMatchId: 19919,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCORE_DONE',
        participants: [
            {
                id: '1401',
                resultText: null,
                isWinner: false,
                status: null,
                name: '07 - Texas A&M',
                picture: null,
            },
            {
                id: '1336',
                resultText: null,
                isWinner: true,
                status: null,
                name: '10 - Penn St.',
                picture: null,
            },
        ],
    },
    {
        id: 19921,
        name: 'Round 1 - Match 24',
        nextMatchId: 19919,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCORE_DONE',
        participants: [
            {
                id: '1400',
                resultText: null,
                isWinner: true,
                status: null,
                name: '02 - Texas',
                picture: null,
            },
            {
                id: '1159',
                resultText: null,
                isWinner: false,
                status: null,
                name: '15 - Colgate',
                picture: null,
            },
        ],
    },
    // END Midwest
    // START WEST DIVISION
    {
        id: 19925,
        name: 'Round 1 - Match 25',
        nextMatchId: 19924,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCORE_DONE',
        participants: [
            {
                id: '1242',
                resultText: null,
                isWinner: true,
                status: null,
                name: '01 - Kansas',
                picture: null,
            },
            {
                id: '1224',
                resultText: null,
                isWinner: false,
                status: null,
                name: '16 - Howard',
                picture: null,
            },
        ],
    },
    {
        id: 19926,
        name: 'Round 1 - Match 26',
        nextMatchId: 19924,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCORE_DONE',
        participants: [
            {
                id: '1116',
                resultText: null,
                isWinner: true,
                status: null,
                name: '08 - Arkansas',
                picture: null,
            },
            {
                id: '1228',
                resultText: null,
                isWinner: false,
                status: null,
                name: '09 - Illinois',
                picture: null,
            },
        ],
    },
    {
        id: 19928,
        name: 'Round 1 - Match 27',
        nextMatchId: 19927,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCORE_DONE',
        participants: [
            {
                id: '1388',
                resultText: null,
                isWinner: true,
                status: null,
                name: `05 - Saint Mary's`,
                picture: null,
            },
            {
                id: '1433',
                resultText: null,
                isWinner: false,
                status: null,
                name: '12 - VCU',
                picture: null,
            },
        ],
    },
    {
        id: 19929,
        name: 'Round 1 - Match 28',
        nextMatchId: 19927,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCHEDULED',
        participants: [
            {
                id: '1163',
                resultText: null,
                isWinner: false,
                status: null,
                name: '04 - UConn',
                picture: null,
            },
            {
                id: '1233',
                resultText: null,
                isWinner: false,
                status: null,
                name: '13 - Iona',
                picture: null,
            },
        ],
    },
    {
        id: 19932,
        name: 'Round 1 - Match 29',
        nextMatchId: 19931,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCHEDULED',
        participants: [
            {
                id: '1395',
                resultText: null,
                isWinner: false,
                status: null,
                name: '06 - TCU',
                picture: null,
            },
            {
                id: '1113',
                resultText: null,
                isWinner: false,
                status: null,
                name: '11 - Arizona St.',
                picture: null,
            },
        ],
    },
    {
        id: 19933,
        name: 'Round 1 - Match 30',
        nextMatchId: 19931,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCHEDULED',
        participants: [
            {
                id: '1211',
                resultText: null,
                isWinner: false,
                status: null,
                name: '03 - Gonzaga',
                picture: null,
            },
            {
                id: '1213',
                resultText: null,
                isWinner: false,
                status: null,
                name: '14 - Grand Canyon',
                picture: null,
            },
        ],
    },
    {
        id: 19935,
        name: 'Round 1 - Match 31',
        nextMatchId: 19934,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCORE_DONE',
        participants: [
            {
                id: '1321',
                resultText: null,
                isWinner: true,
                status: null,
                name: '07 - Northwestern',
                picture: null,
            },
            {
                id: '1129',
                resultText: null,
                isWinner: false,
                status: null,
                name: '10 - Boise St.',
                picture: null,
            },
        ],
    },
    {
        id: 19936,
        name: 'Round 1 - Match 32',
        nextMatchId: 19934,
        nextLooserMatchId: undefined,
        tournamentRoundText: '1',
        startTime: '2023-03-16',
        state: 'SCORE_DONE',
        participants: [
            {
                id: '1417',
                resultText: null,
                isWinner: true,
                status: null,
                name: '02 - UCLA',
                picture: null,
            },
            {
                id: '1421',
                resultText: null,
                isWinner: false,
                status: null,
                name: '15 - UNC Asheville',
                picture: null,
            },
        ],
    },
];

export type Theme = {
    fontFamily: string;
    transitionTimingFunction: string;
    disabledColor: string;
    matchBackground: {
        wonColor: string;
        lostColor: string;
    };
    border: {
        color: string;
        highlightedColor: string;
    };
    textColor: {
        highlighted: string;
        main: string;
        dark: string;
        disabled: string;
    };
    score: {
        text: {
            highlightedWonColor: string;
            highlightedLostColor: string;
        };
        background: {
            wonColor: string;
            lostColor: string;
        };
    };
    canvasBackground: string;
};

const defaultTheme: Theme = {
    fontFamily: '"Roboto", "Arial", "Helvetica", "sans-serif"',
    transitionTimingFunction: 'cubic-bezier(0, 0.92, 0.77, 0.99)',

    disabledColor: '#5D6371',
    matchBackground: {
        wonColor: '#1D2232',
        lostColor: '#141822',
    },
    border: {
        //color: '#22293B',
        color: '#cc1540',
        highlightedColor: '#707582',
    },
    textColor: {
        highlighted: '#E9EAEC',
        //main: '#BEC0C6',
        main: '#000000',
        //dark: '#707582',
        dark: '#ffffff',
        disabled: '#5D6371',
    },
    score: {
        text: {
            highlightedWonColor: '#118ADE',
            highlightedLostColor: '#FF9505',
        },
        background: {
            wonColor: '#10131C',
            lostColor: '#10131C',
        },
    },
    canvasBackground: '#0B0D13',
};

export const SingleElimination = ({ isMobile }) => {
    const [predictionResults, setPredictionResults] = useState(null); // TODO: Type the prediction result;

    const SingleEliminationBracket = loadable(() => import('@g-loot/react-tournament-brackets'), {
        ssr: false,
        resolveComponent: (components) => components.SingleEliminationBracket,
    });

    const SVGViewer = loadable(() => import('@g-loot/react-tournament-brackets'), {
        ssr: false,
        resolveComponent: (components) => components.SVGViewer,
    });

    useEffect(() => {
        async function fetchPredictions() {
            try {
                const bracketPredictions = await fetch(
                    'https://aqueduct-public-assets-bucket.s3.us-east-2.amazonaws.com/webapp/pages/march-madness/data/march-madness-2023-predictions-full.json',
                );
                const bracketPredictionsJson = await bracketPredictions.json();
                setPredictionResults(bracketPredictionsJson);
            } catch (error) {
                console.log('Unable to fetch predictions. Error: ', error);
            }
        }

        fetchPredictions();
    }, []);

    // Make a map of team ids to names
    const teams: Record<string, string> = {};
    TeamNames.teams.forEach((team) => {
        teams[team.TeamID] = team.TeamName;
    });

    // Make a map of match ID's to predictions.
    // id format: 2023_<team1Id>_<team2Id>,
    const predictions: Record<string, string> = {};

    if (predictionResults) {
        predictionResults.predictions.forEach((prediction) => {
            predictions[prediction.ID] = prediction.Pred;
        });
    }

    const matchPredictions = demoMatches.map((match) => {
        // Iterate through each match and print out who is playing who, as well as the prediction for the match.
        const team1 = match.participants[0];
        const team2 = match.participants[1];

        // may be a little confusing, but:
        // teams in Kaggle's submission format have four digit ids.
        // anything else that's a UUID is something that is just in there for mocking purposes at the moment.
        // Matches where players are undecided will have UUIDs as a team id (or a name of name BLANK, ---)

        if (team1.id.length > 4 || team2.id.length > 4) {
            return match;
        }

        // NOTE: lower team ids go first.
        // smash ids together and get the prediction.
        const lowerId = Math.min(parseInt(team1.id), parseInt(team2.id));
        const higherId = Math.max(parseInt(team1.id), parseInt(team2.id));
        const predictionId = `2023_${lowerId}_${higherId}`;

        const predictionResult = predictions[predictionId];
        // only render predictions on games which we have them for.
        if (predictionResult) {
            const team2Odds = 1 - parseFloat(predictionResult);
            match.participants[0].resultText = parseFloat(predictionResult).toFixed(2);
            match.participants[1].resultText = team2Odds.toFixed(2);
        } else {
            console.log('match: ', match);
        }

        return match;
    });

    return (
        <SingleEliminationBracket
            theme={defaultTheme}
            matches={matchPredictions}
            options={{
                style: {
                    // Other things that we can style up:
                    //roundHeader: { backgroundColor: '#AAA' },
                    //connectorColor: '#FF8C00',
                    connectorColor: 'aqua',
                    connectorColorHighlight: 'aqua',
                    roundHeader: {
                        roundTextGenerator: (currentRoundNumber: number, roundsTotalNumber: number) => {
                            if (currentRoundNumber === 1) {
                                return 'Round 1';
                            } else if (currentRoundNumber === 2) {
                                return 'Round 2';
                            } else if (currentRoundNumber === 3) {
                                return 'Sweet 16';
                            } else if (currentRoundNumber === 4) {
                                return 'Elite 8';
                            } else if (currentRoundNumber === 5) {
                                return 'Final 4';
                            } else {
                                return 'Championship';
                            }
                        },
                    },
                },
            }}
            matchComponent={({
                match,
                onMatchClick,
                onPartyClick,
                onMouseEnter,
                onMouseLeave,
                topParty,
                bottomParty,
                topWon,
                bottomWon,
                topHovered,
                bottomHovered,
                topText,
                bottomText,
                connectorColor,
                computedStyles,
                teamNameFallback,
                resultFallback,
            }) => {
                // Check for winners and losers.
                const winnerTextStyle = { color: 'green' };
                const predictionTextStyle = { opacity: 1, marginLeft: '16px' };
                const loserTextStyle = { textDecoration: 'line-through' };
                let topTextStyle, bottomTextStyle;

                if (match.state === 'SCORE_DONE') {
                    predictionTextStyle.opacity = 0.65;
                    if (match.participants[0].isWinner) {
                        topTextStyle = winnerTextStyle;
                        bottomTextStyle = loserTextStyle;
                    } else {
                        topTextStyle = loserTextStyle;
                        bottomTextStyle = winnerTextStyle;
                    }
                }

                return (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            color: '#fff',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        {topText && <div>{topText}</div>}
                        <div onMouseEnter={() => onMouseEnter(topParty.id)} style={{ display: 'flex' }}>
                            <div style={topTextStyle}>{topParty.name || teamNameFallback}</div>
                            <div
                                style={{
                                    ...predictionTextStyle,
                                    color: parseFloat(topParty.resultText) >= 0.5 ? 'green' : 'red',
                                }}
                            >
                                {topParty.resultText ?? resultFallback(topParty)}
                            </div>
                        </div>
                        <div style={{ height: '1px', width: '100%', background: connectorColor }} />
                        <div onMouseEnter={() => onMouseEnter(bottomParty.id)} style={{ display: 'flex' }}>
                            <div style={bottomTextStyle}>{bottomParty.name || teamNameFallback}</div>
                            <div
                                style={{
                                    ...predictionTextStyle,
                                    color: parseFloat(bottomParty.resultText) >= 0.5 ? 'green' : 'red',
                                }}
                            >
                                {bottomParty.resultText ?? resultFallback(topParty)}
                            </div>
                        </div>
                        <div>{bottomText}</div>
                    </div>
                );
            }}
            svgWrapper={({ children, ...props }) => (
                <SVGViewer
                    background={'black'}
                    SVGBackground={'black'}
                    width={isMobile ? 300 : 1300}
                    height={800}
                    miniatureProps={{ width: 0, height: 0 }}
                    startAt={[0, 10]}
                    scaleFactor={0.5}
                    {...props}
                >
                    {children}
                </SVGViewer>
            )}
        />
    );
};

export default SingleElimination;
