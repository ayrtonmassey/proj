import json
import re
import sys
import csv
import textwrap
from collections import OrderedDict
from tabulate import tabulate

exp_labels=("None at all", "Basic", "Advanced");
demo_labels=("COPT Students", "Computer Science", "STEM Subject", "University Student", "None of the Above")

with open('events-28-03-16.json', 'r') as f:
    event_data = json.loads(f.read())

existing_users = []
with open('users.csv', 'r') as f:
    for line in f:
        existing_users.append(line.strip())

survey_data = []
survey_users = []
with open ('survey-28-03-16.csv', 'r') as f:
    reader = csv.reader(f, dialect='excel')
    for row in reader:
        survey_data.append(row)
        survey_users.append(row[3])
        
import matplotlib
matplotlib.use('TkAgg')

import matplotlib.pyplot as plt
from matplotlib.ticker import ScalarFormatter, FuncFormatter

font = {'family' : 'normal',
        'weight' : 'normal',
        'size'   : 22}

matplotlib.rc('font', **font)

import numpy as np
import matplotlib.mlab as mlab

def get_user_experience():
    labels={'exp-none': "None at all", 'exp-basic': "Basic", 'exp-advanced': "Advanced"}
    with open ('user-exps.csv', 'r') as f:
        reader = csv.reader(f, dialect='excel')
        users = { }
        for row in reader:
            users[row[0]]=labels[row[1]]

    return users


def get_user_demo():
    labels={'usr-cs-degree': "Computer Science", 'usr-copt-student': "COPT Students", 'usr-stem-degree': "STEM Subject", 'usr-uni-student': "University Student"}

    with open ('user-bgs.csv', 'r') as f:
        reader = csv.reader(f, dialect='excel')
        users = { user_id : 'None of the Above' for user_id in existing_users }
        for row in reader:
            uid = row[0]
            demo = row[1]
            if uid in users:
                if users[uid] in ('Compiler Optimisations', 'Computer Science', 'STEM Subject') and demo in ['usr-uni-student']:
                    continue
                if users[uid] in ('Compiler Optimisations', 'Computer Science') and demo in ['usr-stem-student', 'usr-uni-student']:
                    continue
                if users[uid] in ('Compiler Optimisations') and demo in ['usr-cs-student', 'usr-stem-student', 'usr-uni-student']:
                    continue
            users[uid] = labels[demo]

    return users


def print_survey_userids():
    for row in survey_data[1:]:
        sys.stdout.write('(NULL, \'{}\'), '.format(row[3]))

        
def get_times_spent(by_exp=False, by_demo=False):
    """In seconds"""
    with open ('times.csv', 'r') as f:
        reader = csv.reader(f, dialect='excel')
        users = {}
        for row in reader:
            user_id = row[0]
            epoch = float(row[1])
            if user_id not in users:
                users[user_id] = {'block_start': epoch, 'block_end': epoch, 'time_spent': 0}
            
            if (epoch - users[user_id]['block_end']) < 10*60:
                users[user_id]['block_end'] = epoch
            else:
                users[user_id]['time_spent'] += users[user_id]['block_end'] - users[user_id]['block_start']
                users[user_id]['block_start'] = epoch
                users[user_id]['block_end'] = epoch

        for user_id in users:
            if users[user_id]['block_start'] != users[user_id]['block_end']:
                users[user_id]['time_spent'] += users[user_id]['block_end'] - users[user_id]['block_start']

        if (by_exp):
            exps = get_user_experience()
            return OrderedDict([
                (l, [ (k, v['time_spent']) for k, v in users.items() if exps[k] == l ])
                for l in exp_labels
            ])
        elif (by_demo):
            demos = get_user_demo()
            return OrderedDict([
                (l, [ (k, v['time_spent']) for k, v in users.items() if demos[k] == l ])
                for l in demo_labels
            ])
        else:
            return [ (k, v['time_spent']) for k, v in users.items() ]

valid_users = [ u for u, t in get_times_spent() if t > 5*60. ]
        
# These are the "Tableau 20" colors as RGB.    
tableau20 = [(31, 119, 180), (174, 199, 232), (255, 127, 14), (255, 187, 120),
             (44, 160, 44), (152, 223, 138), (214, 39, 40), (255, 152, 150),
             (148, 103, 189), (197, 176, 213), (140, 86, 75), (196, 156, 148),
             (227, 119, 194), (247, 182, 210), (127, 127, 127), (199, 199, 199),
             (188, 189, 34), (219, 219, 141), (23, 190, 207), (158, 218, 229)]    
        
# Scale the RGB values to the [0, 1] range, which is the format matplotlib accepts.    
for i in range(len(tableau20)):    
    r, g, b = tableau20[i]    
    tableau20[i] = (r / 255., g / 255., b / 255.)    

def get_new_plot(figsize=(12,14)):
    plt.close()

    # You typically want your plot to be ~1.33x wider than tall. This plot is a rare    
    # exception because of the number of lines being plotted on it.    
    # Common sizes: (10, 7.5) and (12, 9)    
    fig = plt.figure(figsize=figsize)    

    # Remove the plot frame lines. They are unnecessary chartjunk.    
    ax = plt.subplot(111)    
    ax.spines["top"].set_visible(False)    
    ax.spines["bottom"].set_visible(False)    
    ax.spines["right"].set_visible(False)    
    ax.spines["left"].set_visible(False)    

    # Ensure that the axis ticks only show up on the bottom and left of the plot.    
    # Ticks on the right and top of the plot are generally unnecessary chartjunk.    
    ax.get_xaxis().tick_bottom()    
    ax.get_yaxis().tick_left()    

    # Make sure your axis ticks are large enough to be easily read.    
    # You don't want your viewers squinting to read your plot.    
    plt.yticks(fontsize=18)
    plt.xticks(fontsize=18)

    # Remove the tick marks; they are unnecessary with the tick lines we just plotted.    
    plt.tick_params(axis="both", which="both", bottom="off", top="off",    
                    labelbottom="on", left="off", right="off", labelleft="on")

    return fig, ax

def get_days_spent():
    with open ('distinct_days.csv', 'r') as f:
        reader = csv.reader(f, dialect='excel')
        data=[]
        for row in reader:
            data.append((row[0],row[1]))

    return data
    
def plot_days_spent():
    fig, ax = get_new_plot(figsize=(10,9))

    user_exps = get_user_experience()
    x = [ [ float(v) for k,v in get_days_spent() if k in valid_users and user_exps[k] == l ] for l in exp_labels ]
    
    n, bins, patches = ax.hist(
        x, 10,
        histtype='bar',
        stacked=True,
        range=(0.5, 10.5),
        # alpha=0.75,
        edgecolor="none",
        color=[ tableau20[idx] for idx in [0, 18, 19] ],
        label=exp_labels
    )

    ax.legend(title="Subject Experience", frameon=False, fontsize=20)
    
    ax.set_xlim(left=0, right=11)

    ax.set_xticks(np.arange(12))

    for tick in ax.get_xaxis().get_major_ticks():
        tick.label.set_fontsize(18)
        
    for tick in ax.get_yaxis().get_major_ticks():        
        tick.label.set_fontsize(18)
    
    ax.set_xlabel('Unique Days Visited per User')
    ax.set_ylabel('Number of Users, N={}'.format(len([item for sublist in x for item in sublist])))
    ax.grid(True, color=(0.7,0.7,0.7))
    ax.set_axisbelow(True)

    plt.show()

    fig.savefig('unique_days.pdf')

    
def plot_days_spent_demos():
    fig, ax = get_new_plot()

    user_demos = get_user_demo()
    x = [ [ float(v) for k,v in get_days_spent() if k in valid_users and user_demos[k] == l ] for l in demo_labels ]
    
    n, bins, patches = ax.hist(
        x, 10,
        histtype='bar',
        stacked=True,
        range=(0.5, 10.5),
        # alpha=0.75,
        edgecolor="none",
        color=[ tableau20[idx] for idx in (0,1,18,8,12) ],
        label=demo_labels
    )
    
    ax.set_xlim(left=0, right=11)

    ax.set_xticks(np.arange(12))
    
    ax.set_xlabel('Unique Days Visited per User')
    ax.set_ylabel('Number of Users, N={}'.format(len([item for sublist in x for item in sublist])))
    
    ax.legend(title="Subject Experience", frameon=False, fontsize=20)
    
    ax.grid(True, color=(0.7,0.7,0.7))
    ax.set_axisbelow(True)

    plt.show()

    fig.savefig('unique_days_demos.pdf')


def plot_time_spent():
    fig, ax = get_new_plot(figsize=(10,8))
    
    x = [ np.array([ v for k, v in get_times_spent(by_exp=True)[l] if v > 5*60. ]) / 60. for l in exp_labels ]
    # the histogram of the data
    n, bins, patches = ax.hist(
        x, 14,
        stacked=True,
        histtype='bar',
        range=(5,145),
        # alpha=0.75,
        edgecolor="none",
        color=[ tableau20[idx] for idx in [0, 18, 19] ],
        label=exp_labels
    )

    ax.legend(title="Subject Experience", frameon=False, fontsize=20)

    ax.set_xticks(np.arange(0, 170, 10))

    for tick in ax.get_xaxis().get_major_ticks():
        tick.label.set_fontsize(18)
        tick.label.set_rotation(-40)
        
    for tick in ax.get_yaxis().get_major_ticks():        
        tick.label.set_fontsize(18)
    
    ax.set_xlabel('Time Spent / Minutes')
    ax.set_ylabel('Number of Users, N={}'.format(len([item for sublist in x for item in sublist])))
    ax.grid(True, color=(0.7,0.7,0.7))
    ax.set_axisbelow(True)

    plt.show()

    fig.savefig('time_distribution.pdf')

    
def plot_time_spent_bgs():
    fig, ax = get_new_plot()
    
    x = [ np.array([ v for k, v in get_times_spent(by_demo=True)[l] if v > 5*60. ]) / 60. for l in demo_labels ]
    
    # the histogram of the data
    n, bins, patches = ax.hist(
        x, 14,
        stacked=True,
        histtype='bar',
        range=(5,145),
        # alpha=0.75,
        edgecolor="none",
        color=[ tableau20[idx] for idx in (0,1,18,8,12) ],
        label=demo_labels
    )

    ax.legend(title="Academic Background", frameon=False, fontsize=20)

    ax.set_xticks(np.arange(0, 170, 10))
    
    ax.set_xlabel('Time Spent / Minutes')
    ax.set_ylabel('Number of Users, N={}'.format(len([item for sublist in x for item in sublist])))
    ax.grid(True, color=(0.7,0.7,0.7))
    ax.set_axisbelow(True)

    plt.show()

    fig.savefig('time_distribution_bgs.pdf')    


def plot_checkbox_bars(col, items, tickstep, filename):
    fig, ax = get_new_plot(figsize=(7.5,len(items) * 0.8))

    fig.subplots_adjust(left=0.43)

    scores = OrderedDict([ (item,0) for item in reversed(items) ])

    for response in survey_data[1:]:
        checks = response[col].split(';')
        for check in checks:
            if check != '':
                if check not in items:
                    check = 'Other'
                scores[check] += 1
    
    ypos = (np.arange(len(items))+.5)*1.5    # the bar centers on the y axis

    xs = [ v for k,v in scores.items() ]
    ax.barh(ypos, xs, height=0.7, align='center', color=tableau20[0], edgecolor="none")

    ax.legend()

    ax.set_yticks(ypos)
    ax.set_yticklabels([textwrap.fill(item,35) for item in scores])

    ax.set_xticks(range(0,30,tickstep))
    ax.set_xlim(left=0, right=max(xs) * 1.1)

    ax.grid(True)
    ax.set_axisbelow(True)
    ax.set_axis_bgcolor((0,0,0,0))

    ax2 = ax.twinx()
    ax2.spines["top"].set_visible(False)
    ax2.spines["bottom"].set_visible(False)
    ax2.spines["right"].set_visible(False)
    ax2.spines["left"].set_visible(False)
    ax2.get_xaxis().tick_bottom()
    ax2.get_yaxis().tick_right()
    ax2.set_ylim(ax.get_ylim())
    plt.yticks(fontsize=14)
    plt.xticks(fontsize=14)
    ax2.set_yticks(ypos)
    ax2.set_yticklabels([ '{:d}'.format(scores[item]) for item in scores])
    
    plt.show()

    fig.savefig('{}.pdf'.format(filename))
    
    
def plot_demo_q1():
    fig = plt.figure(figsize=(11.69,8.27))
    ax = fig.gca()

    x = [ len([k for k, v in get_times_spent(by_exp=True)[l] if v > 5*60.]) for l in exp_labels ]

    def make_autopct(values):
        def my_autopct(pct):
            total = sum(values)
            val = int(round(pct*total/100.0))
            return '{p:.1f}% ({v:d})'.format(p=pct,v=val)
        return my_autopct
    
    wedges, texts, pcts = plt.pie(
        x, labels = exp_labels, colors=[ tableau20[idx] for idx in [0, 18, 19] ], startangle=10,
        # labeldistance=0.45,
        pctdistance=0.50, autopct=make_autopct(x))
    
    for w,t,p in zip(wedges, texts, pcts):
        w.set_linewidth(0)
        w.set_edgecolor("none")
        t.set_verticalalignment('center')
        t.set_color([ c*0.3 for c in w._facecolor[:3]])
        p.set_color([ c*0.3 for c in w._facecolor[:3]])
        t.set_fontsize(28)
        p.set_fontsize(24)
        if (t._text != "Advanced"):
            p.set_fontsize(32)
        else:
            p.set_horizontalalignment('left')

    plt.axis('equal')
    
    plt.show()

    fig.savefig('experience_pie.pdf')

    
def get_completed_lessons():
    with open ('lessons-complete.csv', 'r') as f:
        reader = csv.reader(f, dialect='excel')
        users={}
        for row in reader:
            user_id   = row[0]
            lesson_id = row[1]
            count     = row[2]
            if user_id not in users:
                users[user_id] = {}
            users[row[0]][row[1]] = count

        return users

def get_started_lessons():
    with open ('lessons-started.csv', 'r') as f:
        reader = csv.reader(f, dialect='excel')
        users={}
        for row in reader:
            user_id   = row[0]
            lesson_id = row[1]
            count     = row[2]
            if user_id not in users:
                users[user_id] = {}
            users[row[0]][row[1]] = count

        return users


matplotlib.rcParams['font.family'] = 'Roboto'
def plot_lessons_complete():
    fig, ax = get_new_plot(figsize=(4.35,12.0))

    fig.subplots_adjust(left=0.22)
    
    lessons = OrderedDict([ ("intro", "Introduction"), ("roundrobin", "Round Robin Algorithm"), ("generic_framework", "Generic Framework") ])
    lesson_complete_counts = OrderedDict([ (v, 0) for k, v in lessons.items() ])
    lesson_start_counts = OrderedDict([ (v, 0) for k, v in lessons.items() ])

    # Plot started percentages
    for user, counts in get_started_lessons().items():
        if user in valid_users:
            for lesson, count in counts.items():
                lesson_start_counts[lessons[lesson]] += (1 if int(count) > 0 else 0)

    for k, lesson in lessons.items():
        lesson_start_counts[lesson] /= float(len(valid_users))

    yvals = [ v for k,v in lesson_start_counts.items() ]
    # the histogram of the data
    xs = np.arange(len(yvals))
    handles = ax.bar(
        xs + 0.15,
        np.array(yvals) * 100,
        width=0.7,
        # alpha=0.75,
        edgecolor="none",
        color=[ tableau20[idx] for idx in (1, 5, 7) ],
    )
    
    # Plot complete percentages
    for user, counts in get_completed_lessons().items():
        if user in valid_users:
            for lesson, count in counts.items():
                lesson_complete_counts[lessons[lesson]] += (1 if int(count) > 0 else 0)

    for k, lesson in lessons.items():
        lesson_complete_counts[lesson] /= float(len(valid_users))

    yvals = np.array([ v for k,v in lesson_complete_counts.items() ])
    # the histogram of the data
    handles = []
    xs = np.arange(len(yvals))
    for (x, y, c) in zip(xs + 0.15, yvals*100, [ tableau20[idx] for idx in (0, 4, 6) ]):
        handles.append(ax.bar(
            [x], [y],
            width=0.7,
            # alpha=0.75,
            edgecolor="none",
            color=c
        ))

    for (x, cont) in zip(xs, handles):
        for rect in cont:
            height = rect.get_height()
            c = rect._original_facecolor
            ax.text(rect.get_x() + rect.get_width()/2., height-6, '{:.0f}%'.format(float(lesson_complete_counts.values()[x]) / float(lesson_start_counts.values()[x]) * 100.), color=np.array(c[:3])*0.3, ha='center', va='bottom', fontsize=18)
        
    ax.legend(handles=handles, labels=[ l for k, l in lessons.items() ], fontsize=14, frameon=False)
    
    ax.set_ylim(bottom=-1, top=110)
    ax.set_xlim(left=-0.1, right=3.1)
    ax.set_axis_bgcolor((0,0,0,0))

    ax.tick_params(
        axis='x',
        which='both',
        bottom='off',
        top='off',
        labelbottom='off',
    ) 
    # ax.set_xticks(np.arange(len(yvals)) + 0.5)
    # ax.set_xticklabels([ k for k, v in lesson_counts.items() ])

    ax.set_xlabel('Lesson')
    ax.set_ylabel('Percentage of Users Completed / %, N={}'.format(len(valid_users)))
    ax.grid(True)
    ax.set_axisbelow(True)

    plt.show()

    fig.savefig('lessons.pdf')
    
    
def plot_demo_q2():
    fig = plt.figure(figsize=(15,8.27))
    ax = fig.gca()

    counts = OrderedDict([(l,0) for l in demo_labels])

    for user, demo in get_user_demo().items():
        if user in valid_users:
            counts[demo] += 1

    x = [ count for demo, count in counts.items() ]

    def make_autopct(values):
        def my_autopct(pct):
            total = sum(values)
            val = int(round(pct*total/100.0))
            return '{p:.1f}% ({v:d})'.format(p=pct,v=val)
        return my_autopct
    
    wedges, texts, pcts = plt.pie(
        x,
        labels = demo_labels,
        colors=[ tableau20[8], np.array(tableau20[8]) +.15 ] + [ tableau20[idx] for idx in (19, 18, 0) ],
        startangle=31.5,
        # labeldistance=1.15,
        # pctdistance=0.66,
        autopct=make_autopct(x)
    )
    
    for w,t,p in zip(wedges, texts, pcts):
        w.set_linewidth(0)
        w.set_edgecolor("none")
        t.set_verticalalignment('center')
        # p.set_verticalalignment('center')
        if(t._text in ["None of the Above"]):
            p._y -= 0.01
            p._x += 0.08
        t.set_color([ c*0.3 for c in w._facecolor[:3]])
        p.set_color([ c*0.3 for c in w._facecolor[:3]])
        p.set_fontsize(24)
        t.set_fontsize(28)

    plt.axis('equal')
    
    plt.show()

    fig.savefig('background_pie.pdf')


def plot_alternate_use():
    fig = plt.figure(figsize=(8, 5))
    ax = fig.gca()

    responses = OrderedDict([
        ("I would use this software *instead of* one of the methods I selected above.", "Instead"),
        ("I would use this software *alongside* one of the methods I selected above.", "Alongside"),
        ("I would not use this software.", "Not at all"),
    ])

    counts = OrderedDict([ (v,0) for k,v in responses.items()])

    for response in survey_data[1:]:
        if (response[-3] != ''):
            counts[responses[response[-3]]] += 1

    x = [ v for k, v in counts.items() ]

    def make_autopct(values):
        def my_autopct(pct):
            total = sum(values)
            val = int(round(pct*total/100.0))
            return '{p:.1f}% ({v:d})'.format(p=pct,v=val)
        return my_autopct
    
    wedges, texts, pcts = plt.pie(
        x,
        labels = [ "Instead", "Alongside", "Not at all" ],
        colors=[ tableau20[0],
                 tuple([ min(1.0, c+0.15) for c in tableau20[0] ]),
                 tableau20[6] ],
        startangle=5,
        labeldistance=100,
        pctdistance=1.4,
        autopct=make_autopct(x)
    )

    hds = ax.legend(frameon=False, loc=2, fontsize=24)
    hds.legendHandles[0]._edgecolor=(0.0,0.0,0.0,0.0)
    hds.legendHandles[1]._edgecolor=(0.0,0.0,0.0,0.0)
    hds.legendHandles[2]._edgecolor=(0.0,0.0,0.0,0.0)
    
    for w,t,p in zip(wedges, texts, pcts):
        w.set_linewidth(0)
        w.set_edgecolor("none")
        t.set_verticalalignment('center')
        if (t._text=="Instead"):
            p.set_verticalalignment('top')
        elif (t._text=="Alongside"):
            p._x = -0.3
            p._y = -0.3
        t.set_color([ c*0.3 for c in w._facecolor[:3]])
        p.set_color([ c*0.3 for c in w._facecolor[:3]])
        p.set_fontsize(24)
        t.set_fontsize(28)

    plt.axis('equal')
    
    plt.show()

    fig.savefig('alternate_use_pie.pdf')
    

def plot_continued_use():
    fig = plt.figure(figsize=(5,5))
    ax = fig.gca()

    counts = OrderedDict([("Yes", 0), ("No", 0)])

    for response in survey_data[1:]:
        if (response[-2] != ''):
            counts[response[-2]] += 1

    x = [ v for k, v in counts.items() ]

    def make_autopct(values):
        def my_autopct(pct):
            total = sum(values)
            val = int(round(pct*total/100.0))
            return '{p:.1f}% ({v:d})'.format(p=pct,v=val)
        return my_autopct
    
    wedges, texts, pcts = plt.pie(
        x,
        labels = ("Yes", "No"),
        colors=[ tableau20[idx] for idx in (0,6) ],
        startangle=0,
        labeldistance=1.15,
        # pctdistance=0.66,
        autopct=make_autopct(x)
    )
    
    for w,t,p in zip(wedges, texts, pcts):
        w.set_linewidth(0)
        w.set_edgecolor("none")
        t.set_verticalalignment('center')
        # if(t._text in ["University Student", "STEM Subject"]):
        #     t.set_horizontalalignment('left')
        # else:
        # t.set_fontsize(32)
            # t.set_horizontalalignment('center')
        t.set_color([ c*0.3 for c in w._facecolor[:3]])
        p.set_color([ c*0.3 for c in w._facecolor[:3]])
        p.set_fontsize(24)
        t.set_fontsize(28)

    plt.axis('equal')
    
    plt.show()

    fig.savefig('continued_use_pie.pdf')


    
def plot_ranking(filtercol, cols, filename):
    fig, ax = get_new_plot(figsize=(7.5,len(cols) * 0.8))

    fig.subplots_adjust(left=0.43)

    items = { c : survey_data[0][c] for c in cols }
    regex = r'.*\[(.*)\]'
    pat = re.compile(regex)
    for k,v in items.items():
        m = pat.match(v)
        items[k] = m.group(1)

    scores = OrderedDict([ (items[c],{'No Response':0, '1 (Most Important)':0, '2':0, '3':0, '4 (Least Important)':0, 'Total': 0}) for c in reversed(cols) ])

    for response in survey_data[1:]:
        if response[filtercol]=="Yes":
            for col in cols:
                if response[col] != '':
                    scores[items[col]][response[col]] += 1
                    scores[items[col]]['Total'] += 1

    for item, totals in scores.items():
        total = totals['Total']
        totals['1 (Most Important)'] /= float(total)
        totals['2'] /= float(total)
        totals['3'] /= float(total)
        totals['4 (Least Important)'] /= float(total)

        totals['1 (Most Important)'] *= 100.
        totals['2'] *= 100.
        totals['3'] *= 100.
        totals['4 (Least Important)'] *= 100.
    
    d_scores  = np.array([ scores[i]['3'] * -1 for i in scores ])
    
    sd_scores = np.array([ scores[i]['4 (Least Important)'] * -1 for i in scores ]) * 2
    sd_lefts  = d_scores

    a_scores  = np.array([ scores[i]['2'] for i in scores ])
    
    sa_scores = np.array([ scores[i]['1 (Most Important)'] for i in scores ]) * 2
    sa_lefts  = a_scores

    ypos = (np.arange(len(cols))+.5)*1.5    # the bar centers on the y axis
    
    ax.barh(ypos, sd_scores, height=0.7, align='center', color=tableau20[8], edgecolor="none", left=sd_lefts)
    ax.barh(ypos, d_scores , height=0.7, align='center', color=tuple([min(1.0, x+0.15) for x in tableau20[8]]), edgecolor="none", left=[ 0 for x in ypos ])
    ax.barh(ypos, a_scores , height=0.7, align='center', color=tuple([min(1.0, x+0.15) for x in tableau20[0]]), edgecolor="none", left=[ 0 for x in ypos ])
    ax.barh(ypos, sa_scores, height=0.7, align='center', color=tableau20[0], edgecolor="none", left=sa_lefts)

    ax.legend()

    ax.set_yticks(ypos)
    ax.set_yticklabels([textwrap.fill(item,35) for item in scores])

    ax.set_xticks(range(-100,110,20))
    ax.get_xaxis().set_visible(False)
    ax.set_xlim(left=-5+min(sd_scores + d_scores), right=5+max(sa_scores + a_scores))

    ax.grid(True)
    ax.set_axisbelow(True)
    ax.set_axis_bgcolor((0,0,0,0))

    for item, d in scores.items():
        total = scores[item]['Total']
        pop_totals = { k: (v * total / 100.) for k, v in scores[item].items() if k in ['1 (Most Important)','2','3','4 (Least Important)'] }
        d['Avg'] = (pop_totals['1 (Most Important)']*2 + pop_totals['2']*1 + pop_totals['3']*-1 + pop_totals['4 (Least Important)']*-2)  / sum([v for k,v in pop_totals.items()])

    ax2 = ax.twinx()
    ax2.spines["top"].set_visible(False)
    ax2.spines["bottom"].set_visible(False)
    ax2.spines["right"].set_visible(False)
    ax2.spines["left"].set_visible(False)
    ax2.get_xaxis().tick_bottom()
    ax2.get_yaxis().tick_right()
    ax2.set_ylim(ax.get_ylim())
    plt.yticks(fontsize=14)
    plt.xticks(fontsize=14)
    ax2.set_yticks(ypos)
    ax2.set_yticklabels([ '{:.2f}'.format(scores[item]['Avg']) for item in scores])
    
    plt.show()

    fig.savefig('{}.pdf'.format(filename))


def plot_likert(filtercol, cols, filename):
    fig, ax = get_new_plot(figsize=(8.27,len(cols)))

    fig.subplots_adjust(left=0.45)

    items = { c : survey_data[0][c] for c in cols }
    regex = r'.*\[(.*)\]'
    pat = re.compile(regex)
    for k,v in items.items():
        m = pat.match(v)
        items[k] = m.group(1)

    scores = OrderedDict([ (items[c], {'Strongly Agree': 0, 'Agree': 0, 'No Response': 0, 'Disagree': 0, 'Strongly Disagree': 0, 'Total': 0}) for c in reversed(cols) ])

    for response in survey_data[1:]:
        if response[filtercol]=="Yes":
            for col in cols:
                scores[items[col]][response[col]] += 1
                scores[items[col]]['Total'] += 1
                
    for item, totals in scores.items():
        total = totals['Total']
        totals['Strongly Agree'] /= float(total)
        totals['Agree'] /= float(total)
        totals['Disagree'] /= float(total)
        totals['Strongly Disagree'] /= float(total)

        totals['Strongly Agree'] *= 100.
        totals['Agree'] *= 100.
        totals['Disagree'] *= 100.
        totals['Strongly Disagree'] *= 100.
    
    nr_scores = np.array([ scores[i]['No Response'] for i in scores ])
    nr_lefts  = nr_scores * -1 / 2.
    
    d_scores  = np.array([ scores[i]['Disagree'] * -1 for i in scores ])
    d_lefts   = nr_scores * -1 / 2.
    
    sd_scores = np.array([ scores[i]['Strongly Disagree'] * -1 for i in scores ]) * 2
    sd_lefts  = d_scores

    a_scores  = np.array([ scores[i]['Agree'] for i in scores ])
    a_lefts   = nr_scores / 2.
    
    sa_scores = np.array([ scores[i]['Strongly Agree'] for i in scores ]) * 2
    sa_lefts  = a_scores

    ypos = (np.arange(len(cols))+.5)*1.8    # the bar centers on the y axis
    
    ax.barh(ypos, sd_scores, height=0.7, align='center', color=tableau20[6], edgecolor="none", left=sd_lefts)
    ax.barh(ypos, d_scores , height=0.7, align='center', color=tuple([min(1.0, x+0.15) for x in tableau20[6]]), edgecolor="none", left=d_lefts)
    ax.barh(ypos, nr_scores, height=0.7, align='center', color=tableau20[15], edgecolor="none", left=nr_lefts)
    ax.barh(ypos, a_scores , height=0.7, align='center', color=tuple([min(1.0, x+0.15) for x in tableau20[0]]), edgecolor="none", left=a_lefts)
    ax.barh(ypos, sa_scores, height=0.7, align='center', color=tableau20[0], edgecolor="none", left=sa_lefts)

    ax.legend()

    ax.set_yticks(ypos)
    ax.set_yticklabels([textwrap.fill(item,35) for item in scores])

    ax.set_xticks(range(-100,110,20))
    ax.get_xaxis().set_visible(False)
    ax.set_xlim(left=-5+min(sd_scores + d_scores), right=5+max(sa_scores + a_scores))

    ax.grid(True)
    ax.set_axisbelow(True)
    ax.set_axis_bgcolor((0,0,0,0))

    ax.set_ylim(bottom=0, top=max(ypos)+0.9)

    for item, d in scores.items():
        total = scores[item]['Total']
        pop_totals = { k: (v * total / 100.) for k, v in scores[item].items() if k in ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree', 'No Response'] }
        d['Avg'] = (pop_totals['Strongly Agree']*5 + pop_totals['Agree']*4 + pop_totals['No Response']*3 + pop_totals['Disagree']*2 + pop_totals['Strongly Disagree']*1)  / sum([v for k,v in pop_totals.items()])

    ax2 = ax.twinx()
    ax2.spines["top"].set_visible(False)
    ax2.spines["bottom"].set_visible(False)
    ax2.spines["right"].set_visible(False)
    ax2.spines["left"].set_visible(False)
    ax2.get_xaxis().tick_bottom()
    ax2.get_yaxis().tick_right()
    ax2.set_ylim(ax.get_ylim())
    plt.yticks(fontsize=14)
    plt.xticks(fontsize=14)
    ax2.set_yticks(ypos)
    ax2.set_yticklabels(['{:.2f}'.format(scores[item]['Avg']) for item in scores])
    
    plt.show()

    fig.savefig('{}.pdf'.format(filename))
    

def analyse_test_questions():
    test_attempts = 0
    with open ('test-attempts.csv', 'r') as f:
        reader = csv.reader(f, dialect='excel')
        for row in reader:
            user_id = row[0]
            if user_id in valid_users:
                test_attempts += int(row[1])
    
    questions = OrderedDict([ (x, {'Total':0,'Attempts': 0}) for x in range(10) ])
    with open ('questions-adjusted.csv', 'r') as f:
        reader = csv.reader(f, dialect='excel')
        for row in reader:
            user_id = row[0]
            if user_id in valid_users:
                question_id = int(row[1][-1])
                if question_id == 5:
                    questions[question_id]['Total'] += float(row[2]) / 4.
                elif question_id == 6:
                    questions[question_id]['Total'] += float(row[2]) / 3.
                else:
                    questions[question_id]['Total']    += float(row[2])
                questions[question_id]['Attempts'] += 1
                
    for i in range(10):
        questions[i]['Avg'] = float(questions[i]['Total']) / float(test_attempts) * 100

    for i in range(10):
        questions[i]['Avg Attempts'] = float(questions[i]['Attempts']) / float(test_attempts) * 100

    fig, ax = get_new_plot((12,6))

    # Plot scores
    ys = [ questions[x]['Avg'] for x in questions ]

    rects = []
    for label, xs, c in [("Introduction", [0, 1, 2], 0), ("Round Robin Algorithm", [3, 4], 4), ("Generic Frameworks", [5, 6, 7, 8, 9], 6)]:
        ax.bar(np.array(xs)+1., [ questions[x]['Avg Attempts'] for x in xs ], width=0.7, align='center', color=tableau20[c+1], edgecolor="none")
        rects += zip(xs, ax.bar(np.array(xs) + 1, [ ys[x] for x in xs ], width=0.7, label=label, align='center', color=tableau20[c], edgecolor="none"))

    ax.legend(frameon=False, loc='upper center', fontsize=18)

    ax.set_yticks(range(0, 101, 20))
    ax.set_ylim(bottom=0, top=120.)
    for tick in ax.get_yaxis().get_major_ticks():
        tick.label.set_fontsize(18)
    for tick in ax.get_xaxis().get_major_ticks():
        tick.label.set_fontsize(18)

    ax.set_xticks(range(1,11))
    ax.set_xlim(0, 11)
    
    ax.set_ylabel('Percentage of Participants / %, N={}'.format(test_attempts))
    ax.set_xlabel('Test Question')

    ax.grid(True)
    ax.set_axisbelow(True)
    ax.set_axis_bgcolor((0,0,0,0))

    for x, rect in rects:
        print rect.__class__
        height = rect.get_height()
        c = rect._original_facecolor
        ax.text(rect.get_x() + rect.get_width()/2., height-8, '{:.0f}%'.format(questions[x]['Total'] / questions[x]['Attempts'] * 100), color=np.array(c[:3])*0.3, ha='center', va='bottom', fontsize=18)
    
    plt.show()

    fig.savefig('question_scores.pdf')
    
    
if __name__=='__main__':
    # print len(survey_users)
    # print len([ (u,v) for u,v in get_times_spent() if v >= 5*60. and u in survey_users ])
    plot_time_spent()
    # plot_time_spent_bgs()
    plot_lessons_complete()
    plot_days_spent()
    # plot_days_spent_demos()
    # plot_demo_q1()
    # plot_demo_q2()
    # plot_likert(5, range(6,12), "simulator_opinion")
    # plot_likert(17, range(18,24), "lesson_opinion")
    # plot_ranking(5, range(12,16), "simulator_improvements")
    # plot_continued_use()
    # plot_alternate_use()
    # plot_checkbox_bars(-4, ["Textbooks", "Attending lectures / tutorials", "Reading lecture slides / notes", "Internet resources e.g. Wikipedia, YouTube", "Other"], 5, 'learning_methods')
    # plot_checkbox_bars(-7, ["The interactive elements were engaging.", "The lesson explained the content well.", "The visual elements helped me to understand the content.", "The content was relevant to my studies.", "Other"], 5, 'lesson_staying')
    # plot_checkbox_bars(-6, ["Not enough time to complete during evaluation.", "The lesson did not explain the content well.", "The content was not interesting or engaging.", "The content was not relevant to my studies.", "The software broke or I could not proceed for some reason.", "There were too many mathematical symbols and equations.", "Other"], 1, 'lesson_leaving')
    analyse_test_questions()
