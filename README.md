# Nab for Chocolat

## About
Nab is a mixin for the wonderful OS X editor [Chocolat](https://chocolatapp.com/). It fetches a remote file and replaces the contents of the current editor with the contents of the remote file. It was inspired by the [Nettuts+ Fetch](https://github.com/weslly/Nettuts-Fetch) package for Sublime Text.

## Usage
Nab is available in the `Actions` menu of Chocolat. You can also use the shortcut `^⌥⌘N`. To add remote files to the nab database, use the edit menu item which will open a JSON file containing file URLs and their names, which is formatted like this:

     [
      {
        "name": "item1",
        "url": "http://url.for.item1"
      },
      {
        "name": "item2",
        "url": "http://url.for.item2"
      },
      ...
    ]

## Contributions...
...are very much welcome. Feel free to fiddle with this and send me a pull request.

## Future plans
Right now, Nab only supports single file fetching. I plan to add support for fetching zip files into the current project, as well.

## License

The MIT License (MIT)

Copyright (c) 2014 Dino Paskvan (http://www.dinopaskvan.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.