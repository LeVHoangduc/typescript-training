# TypeScript Practice

## Target

- Apply knowledge of HTML5/CSS3/Typescript
- Understand and apply MVC pattern (MVC-Services)
- Use JSON server to manage the data
- Deploy to the hosting

## Design on figma

[Figma](https://s.net.vn/a8Ww)

- Only get ideas from the design of UI structure

## Information

- Time line: 2023/09/26 – 2023/10/10
- Editor: Visual Studio Code
- Supported browser: Chrome, MS Edge latest
- Supported screen: Screen width 996px or larger (desktop or tablet)

## Requirement

In this practice, we will have 3 objects need to care:

- User
- Card
- Flashcards

List of features need to work on:

- User
  - We will use a fixed user to login to the application
  - Validate the username and password
  - Validate the format of username and password before press to button login
- Card
  - Create the card with properties
  - Update the card
  - Delete the card
  - Show the card detail as a popup
- Flashcards
  - Create flashcards
  - Archive the language
  - Filter cards follow flashcards
  - Delete flashcards

## Team size

- 1 developer: Duc Le

## Develop Environment

- [Visual Studio Code](https://code.visualstudio.com/)
- HTML & CSS & Typescript
- [Github](https://github.com/LeVHoangduc/typescript-training)
- [HTML5 & CSS3 & TypeScript](https://github.com/microsoft/TypeScript)
- [JSON Server](https://github.com/typicode/json-server)

## Deployment

- [Flashcards](https://learn-flashcards.netlify.app/)

## Folder structure

```
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   └── images/
│   ├── styles/
│   │   ├── base/
│   │   ├── components/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── themes/
│   │   ├── utils/
│   │   ├── vendors/
│   │   └── main.css
│   ├── typescripts/
│   │   ├── constants/
│   │   ├── controllers/
│   │   ├── enums/
│   │   ├── helpers/
│   │   ├── models/
│   │   ├── services/
│   │   ├── templates/
│   │   ├── views/
│   │   ├── app.ts
│   │   └── main.ts
|   └── home.html
│   └── index.html
└── .editorconfig
└── .gitignore
└── .prettierrc
└── package.json
└── README.md
```

## Getting started

- Step 01: Clone repository with HTTPS:

```bash
git clone https://github.com/LeVHoangduc/typescript-training.git
```

- Step 02: Move to folder which just cloned in your computer:

```bash
cd typescript-training
```

- Step 03: Change to branch feature/typescript-practice:

```bash
git checkout feature/typescript-practice
```

- Step 04: Move to the "flashcards" folder:

```bash
cd flashcards
```

- Step 05: Install packages

```bash
npm install
```

- Step 06: Run the application

```bash
npm start
```

- Step 07: Move to folder which json-server in your computer:

```bash
cd json-server
```

- Step 08: Run json-server

```bash
json-server --watch src/json-server/db.json
```

## Reference

- Pattern structure applies to styles folder [here](https://gist.github.com/rveitch/84cea9650092119527bc)

- MVC pattern applies to the application [here](https://www.carloscaballero.io/understanding-mvc-for-frontend-typescript/)
