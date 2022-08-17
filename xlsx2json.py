import pandas as pd
import json
import sys
import os

'''
python xlsx2json.py data.xlsx
'''

df = pd.read_excel(sys.argv[1])
df.fillna('-',inplace=True)
# j = df.to_json('file.json', orient='records', lines=True)

# el-table input data format
d = df.to_dict('records')

fn = os.path.basename(sys.argv[1]).split('.')[0]
with open(f'{fn}.json','w') as f:
    json.dump(d,f)


