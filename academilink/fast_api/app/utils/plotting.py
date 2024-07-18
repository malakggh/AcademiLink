import matplotlib.pyplot as plt
import io
import logging

import pandas as pd

logging.basicConfig(level=logging.INFO)

def generate_plot(group, x_col, y_col, title, x_label, y_label, colors, plot_type='bar'):
    if plot_type == 'bar':
        group = group.sort_values(by=y_col, ascending=False)
    
    fig, ax = plt.subplots(figsize=(20, 10))
    
    if plot_type == 'bar':
        bar_colors = [colors[i % len(colors)] for i in range(len(group))]
        ax.bar(group[x_col], group[y_col], color=bar_colors)

        ax.set_title(title)
        ax.set_xlabel(x_label)
        ax.set_ylabel(y_label)
        ax.set_xticks(range(len(group[x_col])))
        ax.set_xticklabels(group[x_col], rotation=50, ha='right', fontsize=14)

        for ticklabel, tickcolor in zip(ax.get_xticklabels(), bar_colors):
            ticklabel.set_color(tickcolor)
    
    elif plot_type == 'pie':
        ax.pie(group[y_col], labels=group[x_col], autopct='%1.1f%%', colors=colors)
        ax.set_title(title)

    plt.tight_layout()
    
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight', dpi=200)
    buf.seek(0)
    
    plt.close(fig)
    
    logging.info(f"Generated plot for {title}")

    return buf


def generate_line_plot(group, x_col, y_col, title, x_label, y_label, colors):
    fig, ax = plt.subplots(figsize=(20, 10))

    ax.plot(group[x_col], group[y_col], marker='o', linestyle='-', color=colors[0])
    ax.set_title(title)
    ax.set_xlabel(x_label)
    ax.set_ylabel(y_label)
    ax.set_xticks(range(len(group[x_col])))
    ax.set_xticklabels(group[x_col], rotation=50, ha='right', fontsize=14)

    plt.tight_layout()

    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight', dpi=200)
    buf.seek(0)
    plt.close(fig)

    logging.info(f"Generated line plot for {title}")

    return buf


def generate_grouped_bar_plot(df, x_col, y_cols, title, x_label, y_label, colors):
    fig, ax = plt.subplots(figsize=(20, 10))
    
    bar_width = 0.2
    index = pd.Index(range(len(df[x_col])))

    for i, y_col in enumerate(y_cols):
        ax.bar(index + i * bar_width, df[y_col], bar_width, label=y_col.replace('_', ' ').capitalize(), color=colors[i % len(colors)])

    ax.set_title(title)
    ax.set_xlabel(x_label)
    ax.set_ylabel(y_label)
    ax.set_xticks(index + bar_width * (len(y_cols) - 1) / 2)
    ax.set_xticklabels(df[x_col], rotation=50, ha='right', fontsize=14)
    ax.legend()

    plt.tight_layout()
    
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight', dpi=200)
    buf.seek(0)
    
    plt.close(fig)
    
    logging.info(f"Generated plot for {title}")

    return buf