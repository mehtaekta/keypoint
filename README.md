Do the exact same thing again. The new binary will be copied over the old one.

git clone creates a copy of git repository node's source code is in
cd node/ changes directory to the one you just created with those files
./configure checks for dependencies and creates a makefile
make executes that makefile, which results in compiling the source code into binary executable(s), libraries and any other outputs
ls -l lists the files in the current directory
node runs the node binary executable you just compiled from source, to ensure the compilation was successful
sudo make install copies the files you just created from the current directory to their permanent homes, /usr/local/bin and such
The last step overwrites whatever's already there with what you just built.