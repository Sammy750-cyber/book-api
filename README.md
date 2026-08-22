# BOOK API

I am currently building a career in DevSecOps which is a field in cyber security, in which part i am learning `Git & CI/CD`. The whole purpose of this project is to prove that i can actually implement what i learn instead of just understanding concepts.

## The project goal:
```text
[ ] Node.js application
[ ] package.json
[ ] package-lock.json
[ ] Test suite
[ ] ESLint
[ ] npm test
[ ] npm run lint
[ ] Build script if applicable
[ ] .github/workflows/ci.yml
[ ] Push workflow to GitHub
[ ] Verify workflow executes
[ ] Create a Pull Request
[ ] Verify CI executes against the PR
[ ] Intentionally introduce a test failure
[ ] Push the broken code
[ ] Observe CI failure
[ ] Fix the test
[ ] Push again
[ ] Verify CI passes
```

## My choice of application

I chose to build this application because it is actually a simple RESTful API project i could think of and it is also perfect to help me understand and demonstrate all the required CI/CD steps.

# Installation
```bash
git clone 
cd book-api
npm run dev # to run
npm build # To builf basically
```

## Testing The project

The thing with the project at this point of commit is that, it runs perfect as it should on my laptop, right?. Yeah, But it failed the test i gave it, it passed every job defined in the workflow but the `test` job.

Here's a proof of that:

![alt text](screenshots/test_1_failed.png)

### Reading through the test log

I found the problem, and yes it can be resolved

### The problems

![problem1](screenshots/problem1.png)
![problem2](screenshots/problem2.png)

The test file `test/bookService.test.ts runs it test sequentially in the same environment, the `bookService module uses a module-level array books and a `nextId counter` so these variables persist across tests. By the time the `delete` test was ran the length was already altered and is now `3`, so you delete on of 3 books, it should return 2 but the test expected `1`.

To resolve that, i added an exported `resetBooks` function to the `src/services/bookService.ts` and then updated the `tests/bookService.test.ts` accordingly, i added a `beforeEach` function to rest the state before each test.

It worked:

![alt text](screenshots/fixed_pr.png)

However this is local test, i still have to push it to make sure it really works