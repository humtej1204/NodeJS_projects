proyectName="new-proyect"
arquitectureType="whoType"
versioning=false
contexting=false
src="\
  src/lib/constants \
  src/utils \
  src/types \
  src/commons \
  test"
structure="\
  structure/infrastructure \
  structure/application \
  structure/domain"
core="\
  core/validators \
  core/external-services \
  core/config"
root="src"


if [ ! -z "$1" ]; then
  proyectName=$1
fi

mkdir -p $proyectName
cp modify-scripts-json.js $proyectName
cd $proyectName
mkdir -p $src
mkdir -p $structure
mkdir -p $core
cp -r core/* src/commons
for arg in "$@"; do
  key="${arg%=*}"
  value="${arg#*=}"

  case $key in
    arquitectureType)
      if [[ "$value" == "typeWho" ]]; then
        arquitectureType="typeWho"
      fi
      ;;
    contexting)
      if [[ "$value" == "true" ]]; then
        contexting=true
      fi
      ;;
    versioning)
      if [[ "$value" == "true" ]]; then
        versioning=true
      fi
      ;;
    *)
      echo "Clave desconocida: $key"
      ;;
  esac
done

if [[ "$contexting" == "true" ]]; then
  root="$root/context-n1"
else
  rm -rf src/commons
fi
if [[ "$versioning" == "true" ]]; then
  root="$root/v1"
fi
mkdir -p $root

if [[ "$arquitectureType" == "whoType" ]]; then
  if [[ "$contexting" == "true" ]]; then
    cp -r core src/context-n1
  else
    cp -r core src
  fi
else
  cp -r structure/* $root
  cp -r core/* $root/infrastructure
fi
rm -rf structure core

cp ../templates/index.ts ../templates/.eslintrc.cjs .
echo "{
  \"proyectName\": \"${proyectName}\",
  \"structure\": \"${arquitectureType}\",
  \"versioning\": ${versioning},
  \"contexting\": ${contexting}
}" >> ms.config.json

# Init Express Proyect and install dependencies
npm init -y
npm i express dotenv cors
npm i -D typescript eslint ts-node-dev @types/express @types/node @typescript-eslint/parser @typescript-eslint/eslint-plugin @types/cors
npm i knex mysql2 --save

# Init Typescript
npx tsc --init

# Add npm scripts
node modify-scripts-json.js
rm modify-scripts-json.js

# Init ESLint
npx eslint .

cd ..
rm -rf node-modules
mv $proyectName ..
cd ../$proyectName
npm i
cd ..

### TESTING
## ./create-ms.sh test1 && \
## ./create-ms.sh test2 contexting=true versioning=true && \
## ./create-ms.sh test3 versioning=true && \
## ./create-ms.sh test4 contexting=true && \
## ./create-ms.sh test5 arquitectureType=typeWho && \
## ./create-ms.sh test6 arquitectureType=typeWho contexting=true versioning=true && \
## ./create-ms.sh test7 arquitectureType=typeWho versioning=true && \
## ./create-ms.sh test8 arquitectureType=typeWho contexting=true
## rm -rf test1 test2 test3 test4 test5 test6 test7 test8