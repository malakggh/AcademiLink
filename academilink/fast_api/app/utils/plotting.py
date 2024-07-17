import matplotlib.pyplot as plt
import io

def generate_plot(group, x_col, y_col, title, x_label, y_label, colors):
    # Sort the group by y_col
    group = group.sort_values(by=y_col, ascending=False)
    
    fig, ax = plt.subplots(figsize=(20, 10))  # Increase the width and height of the figure
    
    # Assign colors to bars
    bar_colors = [colors[i % len(colors)] for i in range(len(group))]
    ax.bar(group[x_col], group[y_col], color=bar_colors)

    ax.set_title(title)
    ax.set_xlabel(x_label)
    ax.set_ylabel(y_label)
    ax.set_xticklabels(group[x_col], rotation=90, ha='center', fontsize=10)  # Rotate x-axis labels and align them to the center

    # Color x-tick labels
    for ticklabel, tickcolor in zip(ax.get_xticklabels(), bar_colors):
        ticklabel.set_color(tickcolor)

    plt.tight_layout()  # Adjust the layout to make room for the labels

    # Save plot to a BytesIO object
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight', dpi=200)
    buf.seek(0)
    
    return buf
