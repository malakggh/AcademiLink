import pandas as pd

def process_data(data, column_names, columns_to_reverse):
    df = pd.DataFrame(data, columns=column_names)
    for col in columns_to_reverse:
        df[col] = df[col].apply(lambda x: x[::-1])
    return df
