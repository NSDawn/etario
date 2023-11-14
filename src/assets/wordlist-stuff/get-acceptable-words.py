import json;

def getWordsOfSize(words, sizes) -> dict :
    
    outDict = {}
    for size in sizes :
        outDict[size] = []

    for word in words :
        if not word.isalpha(): continue
        if not word.islower(): continue

        if len(word) in sizes : 
            outDict[len(word)].append(word)
    
    return outDict


def main() -> str:
    outJSON = ""
    infilePath = "all-words.txt"
    outfilePath = "acceptable-words.json"
    
    with open(infilePath, "r") as allwordsfile :
        outJSON = json.dumps(getWordsOfSize(allwordsfile.read().split('\n'), [2, 3, 4, 5, 6, 7, 8]))
    
    with open(outfilePath, "w") as outfile :
        outfile.write(outJSON);  


if __name__ == '__main__' : 
    main()