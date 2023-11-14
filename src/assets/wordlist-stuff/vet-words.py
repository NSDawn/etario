import json

def vet(o, lengths) :
    outDict = {}
    for length in lengths : 
        length = str(length)
        outDict[length] = []
        for word in o[length]:
            inp = input(word)
            if (not inp) :
                outDict[length].append(word)
    return outDict

def main() : 
    infilePath = 'acceptable-words.json'
    outfilePath = '_vetted-words.json'

    outDict = {}
    with open(infilePath, "r") as infile:
        outDict = json.loads(infile.read())

    with open(outfilePath, "w") as outfile:
        outfile.write(json.dumps(vet(outDict, [4])))




if __name__ == '__main__' :
    main()