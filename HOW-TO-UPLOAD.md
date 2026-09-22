# How to upload this — all files, no folders

Everything is in ONE folder. There are no sub-folders at all, so when you
select all the files, nothing can be left behind.

## Upload

1. Extract the zip (right-click -> Extract All).
2. Open the folder. You will see about 75 files and NO folders.
3. Go to your GitHub repository -> **Add file** -> **Upload files**.
4. Click **choose your files**.
5. Press **Ctrl + A** to select every file, then **Open**.
6. Wait for all of them to appear in the list.
7. Scroll down, click **Commit changes**.

That is it. Because there are no folders, the uploader cannot skip anything.

## Check before deploying

On the repository page you should now see `main.jsx`, `App.jsx`, `index.css`,
`index.html`, `package.json` and the picture files, all in the main list.

Count them: about 75 files.

## Deploy

1. vercel.com -> **Add New** -> **Project** -> import this repository.
2. Change nothing.
3. **Deploy**.

A good build says:

    vite v4.5.5 building for production...
    transforming...
    1500+ modules transformed
    built in 10s

If it says `2 modules transformed`, some files did not upload.

## One thing that is different in this version

Because there is no folder for pictures, the logos and photographs are built
into the website itself. Everything looks and behaves exactly the same.

In the admin panel, the photo boxes now only take **Upload** (from your
computer) or a full web address. Typing a file path no longer works, because
there is no folder to put files in.
