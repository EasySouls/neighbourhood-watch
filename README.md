# Neighbourhood Watch

## Guide for starting up the project
- `yarn install` - installs the packages from the package.json
- `yarn prebuild` - created the android folder from the app.json
- `yarn android` - builds the development build for your device and then runs it, supports hot reload

When you open your editor don't forget to switch to your branch you want to work on.

Before starting up the project, duplicate the .env.example file and rename it to .env.local. DO NOT add this to git, but it should be automatically excluded by the .gitignore file.
Then fill in the neccessary values.

If for some reason the `yarn prebuild` or the `yarn android` commands don't work you can start up expo with `yarn start -- -c` 
(-c clears the build cache, could be useful after some heavy changes or weird errors), then switch from the development build to Expo Go with pressing `s`, then pressing `a` to open
the project on Android with Expo Go.


## Additional useful commands
- `npx expo-doctor` - checks whether your expo project is set up correctly
- `npx expo install <package-name>` - install a new expo package, same as yarn, only that it downloads the correct version for the Expo SDK
- `yarn add <package-name>` - install a new package

## Git commands
You can use the embedded git user interface for these in vs code

- `git pull` - pulls the remote changes to your local repo
- `git checkout <branchname>` - switches to the branch
- `git checkout -b <branchname>` - created the branch, and then switches to it
- `git add *` - stages every changed file
- `git commit -m "commit message"` - creates a commit with the staged changes
