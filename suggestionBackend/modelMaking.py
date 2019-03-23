import pandas as pd
import pickle
import numpy as np

dataset=pd.read_csv('data.csv')
y=dataset.iloc[:,8:9].values
X=dataset.iloc[:,[0,1,2,3,4,5,6,7]].values


from sklearn.preprocessing import LabelEncoder
labelencoder_X = LabelEncoder()
y[:, 0] = labelencoder_X.fit_transform(X[:, 0])

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)

from sklearn.svm import SVC
classifier=SVC(kernel='rbf')
classifier.fit(X_train,y_train)

