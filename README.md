# Minescuffed

Some information about the minescuffed code, and its structure.

## Jargon

`tile` is the name for a single square used as ground/floor (also swimmable liquid) of the world. (Keeps us from falling into the void 🌌)

`structure` is what sits on top of the tiles. Trees, rocks, camp fires, etc.

***

## Biomes

### JSON data structure

Biomes are numbered (starting at 0) and found inside `src/data/biomes.json`. Inside each biome object you'll find something that looks like this:

```json
{
    "0": {
        "name": "NAME_OF_BIOME",
        "clusters": [{
            "name":"NAME_OF_CLUSTER",
            "multiplier": 0.05,
            "layers": [{
                "chance": 0.45,
                "tile": [{
                    "key": "TILE_NAME",
                    "chance": 1
                }],
                "struct": [{
                    "key": "STRUCT_NAME",
                    "chance": 1
                }]
            }]
        }]
    }
}
```

We'll go over each key value.

```json
{
    "name": "NAME_OF_BIOME"
}
```

Just the name of the biome.

```json
{
    "clusters": [{...}]
}
```

**Clusters** is an array of objects. You can think of a cluster as a *patch* or a *sub-biome* inside your biome.

>E.g you might wanna create a forest biome but you want variety in the environment, like the chance of a lake appering or an open space without trees. Then you would add these *varieties* as an object inside clusters.

**Order is important, where index 1 overwrites index 0.**

Inside one of the clusters object you'll find:

```json
{
    "name": "NAME_OF_CLUSTER"
}
```

Just the name of the cluster.

```json
{
    "multiplier": 0.05
}
```

Is applied on a **perlin noise** function and dictates how *rough* or *smooth* the cluster is going to look. The larger the number the more *frequent* and *scattered* the cluster is going to appear. The lower the number the more *rare* and *"put-together"*.

The apperance of the cluster is also depentant on what the configuration is like in the layers object inside the cluster, which we'll go over next.

```json
{
    "layers": [{...}]
}
```

Is an array of objects that defines what the cluster consists of.

>E.g you might what a sand beach around your lake-cluster. Then the sand beach is one of the **layers** inside your lake-cluster along with a water layer of course.

The order in which you put the **layers** are important. First in the list is the *middle* of the cluster and should have the highest `"chance":` value, since it looks at it first comparing a value to see which is bigger. If the `"chance":` value is smaller than the compared to value (from perlin noise) then **it** is selected, if not, then we continue down the list.

This is why a layer in the second position with a `"chance":` value of `0.4` is small if the first layers `"chance":` value is `0.425`, since it only takes into account the differance between them, `0.025`.

Inside you'll find:

```json
{
    "chance": 0.4
}
```

Is the chance of this layer spawning. Higher number means less likely to appear.

```json
{
    "tile": [{
        "key": "grass",
        "chance": 1
    }]
}
```

```json
{
    "struct": [{
        "key": "pinetree",
        "chance":0.9
    }, {
        "key": "stone_moss",
        "chance": 0.91
    }]
}
```

Defines what `tile` or `struct` the layer is going to create, also is an array to give the option of different `tiles` or `structs` spawning. Again order is important, it always checks the first value in the list to see if `math.random()` is smaller. If it's true then **it** will be selected.

### Summary

`tile` and `struct` are the building blocks of the world. To create our world we want to place these building blocks following to some rules to make the world less *chaotic* and *random*, and more *natural* and *organized*. To achive this we divide the world into different **biomes**, that are built off of **clusters**, which are made up off of **layers**, that dictates which building block to choose from. All these step have different chances and multipliers that sets the frequency, size, and shape of our terrain. And it can be hard to understand how all the numbers relate to one another, **so just tinker with them!**

***

## Animations
